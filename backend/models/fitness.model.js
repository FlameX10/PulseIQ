import mongoose from "mongoose";

const fitnessSchema = new mongoose.Schema(
  {
    userId: {
      // Using Google account id as the identifier (session-based)
      type: String,
      required: true,
      unique: true,
    },
    googleId: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: false,
    },
    tokenExpiry: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Fitness = mongoose.model("Fitness", fitnessSchema);
export default Fitness;
