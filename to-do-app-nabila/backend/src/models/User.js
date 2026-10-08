import mongoose from "mongoose";
import { maxLength } from "zod";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      // minlength: 2,
      // maxlength: 50, can be added from frontend. not recommended for backend, watch later
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      // minlength: 6,
      // maxLength: 12 // can be added from frontend. not recommended for backend
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;