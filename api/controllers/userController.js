const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const { compare } = require("bcrypt");

config();

const ApiError = require("../error/ApiError.js");
const {
    Users,
    StudyGroup,
    Tutors,
    PASGroupMembers,
    PASGroup,
    Compitions,
    CompitionsPoints,
} = require("../models/index");

const generateJwt = (id, login, tutor) => {
    return jwt.sign({ id, login, tutor }, process.env.SECRET_KEY, {
        expiresIn: "60d",
    });
};

const getDecodedToken = (token) => {
    return jwt.decode(token);
};

class UserController {
    async logIn(req, res, next) {
        const { login, password } = req.body;

        try {
            Users.findOne(
                {
                    login: login,
                },
                async function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        return res.status(401).json({
                            message: "Пользователь не найден",
                        });
                    }

                    const validPassword = await compare(
                        password,
                        user.password
                    );
                    if (validPassword) {
                        let tutor = await Tutors.findOne({
                            user: user._id,
                        });

                        return res.json({
                            token: generateJwt(
                                user._id,
                                user.login,
                                tutor ? tutor._id : false
                            ),
                        });
                    } else {
                        res.status(400).json({
                            error: "Неправильный логин или пароль",
                        });
                    }
                }
            );
        } catch (e) {
            console.log(e);
            return next(ApiError.internal("Что-то пошло не так", e));
        }
    }

    async check(req, res, next) {
        const { token } = req.body;

        try {
            const { id, login } = getDecodedToken(token);

            Users.findOne(
                {
                    _id: id,
                    login: login,
                },
                function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        return res.status(200).json({
                            auth: false,
                        });
                    } else {
                        return res.status(200).json({
                            auth: true,
                            id: id,
                        });
                    }
                }
            );
        } catch (e) {
            return res.status(200).json({
                auth: false,
            });
        }
    }

    async getUserInfo(req, res, next) {
        const { token } = req.body;
        const { id, tutor } = getDecodedToken(token);

        try {
            Users.findOne({ _id: id }, async function (err, user) {
                if (err) throw err;
                if (!user) {
                    return res.status(401).json({
                        message: "Пользователь не найден!",
                    });
                }

                let studyGroup = await StudyGroup.findById(user.studyGroup);

                let userCompitions = [];
                const compitions = await Compitions.find();
                for (const compition of compitions) {
                    const compUser = await CompitionsPoints.find({
                        user: id,
                        compition: compition._id,
                    });

                    let points = 0;
                    compUser.map((comp) => {
                        points += comp.point;
                    });
                    userCompitions.push({
                        compitionName: compition.title,
                        compitionId: compition._id,
                        points: points,
                        group: "Развито",
                    });
                }

                let userPASgroups = [];
                let tutorInfo = {};

                if (user.tutor) {
                    tutorInfo = await Tutors.findOne({
                        user: id,
                    });
                } else {
                    const groupInfo = await PASGroupMembers.find({
                        user: id,
                    });
                    for (const group of groupInfo) {
                        const userPASgroup = await PASGroup.findById(
                            group.PASgroup
                        );
                        userPASgroups.push(userPASgroup.name);
                    }
                }

                const result = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    studyGroupId: user.studyGroup,
                    studyGroupName: studyGroup ? studyGroup.name : null,
                    studyGroupFullName: studyGroup ? studyGroup.fullName : null,
                    PASGroup: tutor ? null : userPASgroups,
                    tutor: tutor ? true : false,
                    tutorId: tutor ? tutor : null,
                    pac: tutor ? tutorInfo.pac : null,
                    compitions: userCompitions,
                };

                return res.json(result);
            });
        } catch (e) {
            console.log(e);
            return next(ApiError.internal("Ошибка!", e));
        }
    }
}

module.exports = new UserController();
