const { Schema, model, Types } = require("mongoose");

const CriteriaSchema = new Schema({
    serviceName: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    maxMark: {
        type: Number,
        required: true,
    },
    weightMark: {
        type: Number,
        required: true,
    },
    subCriteria: [
        {
            type: Types.ObjectId,
            ref: "SubCriteria",
        },
    ],
    formula: {
        type: String,
    },
});

module.exports = model("Criteria", CriteriaSchema);
