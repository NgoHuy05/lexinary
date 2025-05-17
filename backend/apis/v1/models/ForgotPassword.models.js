const mongoose = require("mongoose");

const ForgotPasswordSchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
        expiresAt: {
            type: Date,
            expires: 0
        }
    },
    {
        timestamps: true
    }
);
const ForgotPassword = mongoose.model("ForgotPassword", ForgotPasswordSchema);
module.exports = ForgotPassword;
