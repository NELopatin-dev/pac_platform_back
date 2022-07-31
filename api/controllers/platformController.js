const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const { config } = require("dotenv");
var async = require("async");

config();

const ApiError = require("../error/ApiError.js");
const {
    OUP,
    PAS,
    PASGroup,
    CriteriaGroup,
    Criteria,
    SubCriteria,
    Points,
    Compitions,
} = require("../models/index");
const { Types } = require("mongoose");

class PlatformController {
    async getOUP(req, res, next) {
        try {
            const OUPs = await OUP.find();
            const lastOUP = OUPs.slice(-1)[0];

            const result = {
                OUP: lastOUP,
            };

            return res.status(200).json(result);
        } catch (e) {
            console.log(e);
            return next(ApiError.internal("Ошибка!", e));
        }
    }

    async getRating_PAS(req, res, next) {
        const { PASid, user_id } = req.body;
        let result = {
            PAS: {},
            rating: [],
            user_id: user_id,
        };

        try {
            result.PAS = await PAS.findById(PASid);
            return res.status(200).json(JSON.stringify(result));
        } catch (e) {
            console.log(e);
            return next(ApiError.internal("Ошибка!", e));
        }
    }

    async getRating_rating_day(req, res, next) {
        const { PAS, rating, user_id } = req.body;
        let result = {
            PAS,
            rating,
            user_id,
        };

        try {
            let index = 0;
            for (const day of result.PAS.days) {
                result.rating.push([]);

                for (const criteriaGroupId of day.CriteriaGroup) {
                    result.rating[index].push(
                        await CriteriaGroup.findOne({ _id: criteriaGroupId })
                    );
                }
                index++;
            }
            return res.status(200).json(JSON.stringify(result));
        } catch (e) {
            console.log(e);
            return next(ApiError.internal("Ошибка!", e));
        }
    }

    async getRating_rating_criteria(req, res, next) {
        const { PAS, rating, user_id } = req.body;
        let result = {
            PAS,
            rating,
            user_id:
                typeof user_id === "string" ? Types.ObjectId(user_id) : user_id,
        };

        try {
            let index = 0;
            for (const day of result.PAS.days) {
                for (const criteriaGroupId of day.CriteriaGroup) {
                    let cgIndex = 0;
                    for (const criteriaGroup of result.rating[index]) {
                        let cIndex = 0;
                        for (const criteriaId of criteriaGroup.criteria) {
                            if (typeof criteriaId === "string") {
                                const criteria = await Criteria.findById(
                                    criteriaId
                                );

                                let userPoint = await Points.findOne({
                                    user: result.user_id,
                                    criterion: criteriaId,
                                });

                                result.rating[index][cgIndex].criteria[cIndex] =
                                    {
                                        ...criteria._doc,
                                        userPoint: userPoint
                                            ? userPoint.point
                                            : 0,
                                    };
                            }

                            cIndex++;
                        }
                        cgIndex++;
                    }
                }
                index++;
            }
            return res.status(200).json(JSON.stringify(result));
        } catch (e) {
            console.log(e);
            return next(ApiError.internal("Ошибка!", e));
        }
    }

    async getRating_rating_subcriteria(req, res, next) {
        const { PAS, rating, user_id } = req.body;
        let result = {
            PAS,
            rating,
            // user_id,
        };

        try {
            let index = 0;
            for (const day of result.PAS.days) {
                for (const criteriaGroupId of day.CriteriaGroup) {
                    let cgIndex = 0;
                    for (const criteriaGroup of result.rating[index]) {
                        let cIndex = 0;
                        for (const criteriaId of criteriaGroup.criteria) {
                            let scIndex = 0;

                            for (const subCriteriaId of result.rating[index][
                                cgIndex
                            ].criteria[cIndex].subCriteria) {
                                if (typeof subCriteriaId === "string") {
                                    const subCriteria =
                                        await SubCriteria.findById(
                                            subCriteriaId
                                        );

                                    const userPoint = await Points.findOne({
                                        user: user_id,
                                        subcriterion: subCriteriaId,
                                    });

                                    result.rating[index][cgIndex].criteria[
                                        cIndex
                                    ].subCriteria[scIndex] = {
                                        ...subCriteria._doc,
                                        userPoint: userPoint
                                            ? userPoint.point
                                            : 0,
                                    };
                                }

                                scIndex++;
                            }

                            if (
                                result.rating[index][cgIndex].criteria[cIndex]
                                    .formula
                            ) {
                                let formula =
                                    result.rating[index][cgIndex].criteria[
                                        cIndex
                                    ].formula;
                                let new_formula = "";

                                formula.split("[").map((part) => {
                                    const arrParts = part.split("]");

                                    try {
                                        arrParts[0] = parseInt(arrParts[0])
                                            ? result.rating[index][cgIndex]
                                                  .criteria[cIndex].subCriteria[
                                                  parseInt(arrParts[0]) - 1
                                              ].userPoint
                                            : "";
                                    } catch (e) {}

                                    new_formula += arrParts.join("");
                                });

                                result.rating[index][cgIndex].criteria[
                                    cIndex
                                ].userPoint = eval(new_formula);
                            }

                            cIndex++;
                        }
                        cgIndex++;
                    }
                }
                index++;
            }
            return res.status(200).json(JSON.stringify(result));
        } catch (e) {
            console.log(e);
            return next(ApiError.internal("Ошибка!", e));
        }
    }

    async getCompitions(req, res, next) {
        try {
            const result = {
                compitions: await Compitions.find(),
            };
            return res.status(200).json(result);
        } catch (e) {
            console.log(e);
            return next(ApiError.internal("Ошибка!", e));
        }
    }

    async getMaxCompitionsPoints(req, res, next) {
        try {
            return res.status(200).json(result);
        } catch (e) {
            console.log(e);
            return next(ApiError.internal("Ошибка!", e));
        }
    }

    async getCalendar(req, res, next) {
        try {
            const OUPs = await OUP.find();
            const lastOUP = OUPs.slice(-1)[0];

            const PASs = await PAS.find({
                OUP: lastOUP._id,
            });

            const result = {
                OUP: lastOUP,
                PASs: PASs,
            };

            return res.status(200).json(result);
        } catch (e) {
            console.log(e);
            return next(ApiError.internal("Ошибка!", e));
        }
    }

    async getPASgroup(req, res, next) {
        try {
            const OUPs = await OUP.find();
            const lastOUP = OUPs.slice(-1)[0];

            const PASs = await PAS.find({
                OUP: lastOUP._id,
            });

            const PASgroups = [];
            for (const PAS of PASs) {
                const PASgroup = await PASGroup.find({
                    _id: {
                        $in: PAS.PASgroups,
                    },
                });
                PASgroups.push(PASgroup);
            }

            Promise.all([OUPs, PASs, PASgroups]).then(() => {
                const result = {
                    OUP: lastOUP,
                    PASs: PASs,
                    PASgroups: PASgroups[0],
                };

                return res.status(200).json(result);
            });
        } catch (e) {
            console.log(e);
            return next(ApiError.internal("Ошибка!", e));
        }
    }
}

module.exports = new PlatformController();
