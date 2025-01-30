const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    name: { type: String },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: { type: String, required: true },
    roles: {
      type: [String],
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    bio:{type:String},
    isEmailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    image: { type: String },
    token: { type: String },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
