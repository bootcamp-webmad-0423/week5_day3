const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['GUEST', 'EDITOR', 'ADMIN'],
      default: 'GUEST',
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;