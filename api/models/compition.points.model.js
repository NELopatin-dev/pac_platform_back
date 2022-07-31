const { Schema, model, Types } = require("mongoose");

const CompitionsPointsSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    compition: {
        type: Types.ObjectId,
        ref: "Compitions",
    },
    criteria: [
        {
            type: Types.ObjectId,
            ref: "Criteria",
        },
    ],
    subCriteria: [
        {
            type: Types.ObjectId,
            ref: "SubCriteria",
        },
    ],
    point: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = model("CompitionsPoints", CompitionsPointsSchema);
