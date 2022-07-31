const { type } = require("express/lib/response");
const { Schema, model, Types } = require("mongoose");

const OUPSchema = new Schema({
    serviceName: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
    },
    yearStart: {
        type: Number,
        required: true,
    },
    yearEnd: {
        type: Number,
        required: true,
    },
    PASs: [
        {
            type: Types.ObjectId,
            ref: "PAS",
        },
    ],
});

module.exports = model("OUP", OUPSchema);
