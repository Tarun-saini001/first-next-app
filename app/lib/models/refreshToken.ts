import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
    token: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    expiresAt: Date,
});

export const RefreshToken =
    mongoose.models.RefreshToken ||
    mongoose.model("RefreshToken", refreshTokenSchema);