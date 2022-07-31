const jwt = require("jsonwebtoken");
const { Types } = require("mongoose");
const { config } = require("dotenv");

config();

const ApiError = require("../error/ApiError.js");
const {
    Users,
    StudyGroup,
    Tutors,
    OUP,
    PAS,
    PASGroup,
    PASGroupMembers,
    Points,
    CompitionsPoints,
    Compitions,
} = require("../models/index");
const { log } = require("async");

const generateJwt = (id, login, tutor) => {
    return jwt.sign({ id, login, tutor }, process.env.SECRET_KEY, {
        expiresIn: "60d",
    });
};

const getDecodedToken = (token) => {
    return jwt.decode(token);
};

class TutorController {
    async getTutorPASgroup(req, res, next) {
        const { token } = req.body;
        const { id, tutor } = getDecodedToken(token);

        try {
            Tutors.findOne({ user: id }, async function (err, user) {
                if (err) throw err;
                if (!user) {
                    return res.status(401).json({
                        message: "Пользователь не найден!",
                    });
                }

                PASGroup.find(
                    {
                        tutor: user._id,
                    },
                    async function (err, PASgroups) {
                        if (err) throw err;
                        if (!PASgroups) {
                            return res.status(401).json({
                                message: "Группы не найден!",
                            });
                        }

                        const GroupMembers = await PASGroupMembers.find({
                            PASGroup: {
                                $in: PASgroups.map((group) => {
                                    return group._id;
                                }),
                            },
                        });

                        let members = {};
                        GroupMembers.map((gr) => {
                            members[gr.PASgroup] = gr.members;
                        });

                        const MembersUserInfo = [];

                        for (const key of Object.keys(members)) {
                            let membersArr = members[key].map(
                                (memberId, index) => {
                                    return memberId;
                                }
                            );

                            members[key] = await Users.find({
                                _id: {
                                    $in: membersArr,
                                },
                            });
                        }

                        const result = {
                            PASgroups: PASgroups ? PASgroups : null,
                            members: members,
                        };

                        return res.json(result);
                    }
                );
            });
        } catch (e) {
            console.log(e);
            return next(ApiError.internal("Ошибка!", e));
        }
    }

    async updatePoint(req, res, next) {
        const { criteriaId, subCriteriaId, user_id, point } = req.body;

        try {
            let filter = {};
            let compitionsFilter = [];

            if (criteriaId !== null) {
                filter = {
                    criterion: Types.ObjectId(criteriaId),
                    user: Types.ObjectId(user_id),
                };

                compitionsFilter = {
                    criteria: Types.ObjectId(criteriaId),
                };
            } else {
                filter = {
                    subcriterion: Types.ObjectId(subCriteriaId),
                    user: Types.ObjectId(user_id),
                };
                compitionsFilter = {
                    subCriteria: Types.ObjectId(subCriteriaId),
                };
            }

            const find = await Points.findOne(filter);
            const compitions = await Compitions.find(compitionsFilter);

            let compitionsId = [];
            compitions.map((compition) => {
                compitionsId.push(compition._id);
            });

            for (const compitionId of compitionsId) {
                const compitionFind = await CompitionsPoints.findOne({
                    user: Types.ObjectId(user_id),
                    ...compitionsFilter,
                    compition: compitionId,
                });

                if (!compitionFind) {
                    await CompitionsPoints.create({
                        user: Types.ObjectId(user_id),
                        ...compitionsFilter,
                        compition: compitionId,
                        point: parseInt(point),
                    });
                } else {
                    await CompitionsPoints.updateOne(
                        {
                            user: Types.ObjectId(user_id),
                            ...compitionsFilter,
                            compition: compitionId,
                        },
                        {
                            $set: {
                                point: point,
                            },
                        }
                    );
                }
            }

            if (find !== null) {
                await Points.updateOne(filter, { $set: { point: point } });
            } else {
                await Points.create({
                    ...filter,
                    point: parseInt(point),
                });
            }

            return res.json(true);
        } catch (e) {
            console.log(e);
            return next(ApiError.internal("Ошибка!", e));
        }
    }
}

module.exports = new TutorController();
