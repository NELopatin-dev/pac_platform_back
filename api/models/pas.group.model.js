const { Schema, model, Types } = require("mongoose");

const PasGroupSchema = new Schema({
    serviceName: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    tutor: {
        type: Types.ObjectId,
        ref: "Tutor",
    },
});

module.exports = model("PasGroup", PasGroupSchema);
