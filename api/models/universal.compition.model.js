const { Schema, model, Types } = require("mongoose");

const CompitionsSchema = new Schema({
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
});

module.exports = model("Compitions", CompitionsSchema);
