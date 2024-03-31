import mongoose from "mongoose";

const usersCollections = "users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  rol: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

mongoose.set("strictQuery", false);

export const UserModel = mongoose.model(usersCollections, userSchema);
