const { Schema, model, Types } = require("mongoose");

const CriteriaGroupSchema = new Schema({
    serviceName: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    criteria: [
        {
            type: Types.ObjectId,
            ref: "Criteria",
        },
    ],
});

module.exports = model("CriteriaGroup", CriteriaGroupSchema);
