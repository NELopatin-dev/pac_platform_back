const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    studyGroup: {
        type: Types.ObjectId,
        ref: "StudyGroup",
    },
});

UserSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// UserSchema.methods.comparePassword = function (password) {
//     console.log("Something do");
//     return bcrypt.compareSync(password, this.hash_password);
// };

module.exports = model("User", UserSchema);
