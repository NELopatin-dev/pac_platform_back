const { Schema, model, Types } = require("mongoose");

const PasGroupMembersSchema = new Schema({
    serviceName: {
        type: String,
        required: true,
        unique: true,
    },
    PASgroup: {
        type: Types.ObjectId,
        ref: "PasGroup",
    },
    members: [
        {
            type: Types.ObjectId,
            ref: "User",
        },
    ],
});

module.exports = model("PasGroupMembers", PasGroupMembersSchema);
