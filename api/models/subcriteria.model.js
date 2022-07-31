const { Schema, model, Types } = require("mongoose");

const SubCriteriaSchema = new Schema({
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
});

module.exports = model("SubCriteria", SubCriteriaSchema);
