const { Schema, model, Types } = require("mongoose");

const StudyGroupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
});

module.exports = model("StudyGroup", StudyGroupSchema);
