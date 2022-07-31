const { Schema, model, Types } = require("mongoose");

const TutorSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
    },
    pac: {
        type: Boolean,
        default: false,
    },
});

module.exports = model("Tutor", TutorSchema);
