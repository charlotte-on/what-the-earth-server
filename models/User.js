const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  // role: {
  //   type: String,
  //   required: true,
  //   enum: ["admin", "user"],
  //   default: "user",
  // },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // profilePic: String,
  // favorites: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Producer",
  // },
  // shopFrom: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Shop",
  // },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
