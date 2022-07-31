const { Schema, model, Types } = require("mongoose");

const PointsSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    criterion: {
        type: Types.ObjectId,
        ref: "Criteria",
    },
    subcriterion: {
        type: Types.ObjectId,
        ref: "SubCriteria",
    },
    point: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = model("Points", PointsSchema);
