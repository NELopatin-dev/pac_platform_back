const { Schema, model, Types } = require("mongoose");
const criteriaGroupModel = require("./criteria.group.model");

const PASSchema = new Schema({
    serviceName: {
        type: String,
        required: true,
        unique: true,
    },
    OUP: {
        type: Types.ObjectId,
        ref: "OUP",
    },
    name: {
        type: String,
        required: true,
    },
    dateStart: {
        type: Date,
        required: true,
    },
    dateEnd: {
        type: Date,
        required: true,
    },
    PASgroups: [
        {
            type: Types.ObjectId,
            ref: "PasGroup",
        },
    ],
    days: [
        {
            CriteriaGroup: [
                {
                    type: Types.ObjectId,
                    ref: "CriteriaGroup",
                },
            ],
        },
    ],
});

module.exports = model("PAS", PASSchema);
