import * as mongoose from "mongoose";
import User from "../models/userModel";
import * as bcrypt from "bcryptjs";
module.exports = {
  createUser: async function ({ userInput }, req) {
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error("User exists already!");
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw,
    });
    const createdUser: any = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },
  getUsers: async function () {
    const users: any = await User.find();
    console.log("users", users);
    return users;
  },
  getUser: async function ({ id }, req) {
    try {
      const user: any = await User.findById(id);
      return user;
    } catch (err) {
      console.log("err", err);
    }
  },
  editUser: async function ({ id, editUserInput }, req) {
    try {
      const user: any = await User.findById(id);
      console.log(user, "user");
      if (!user) {
        const error = new Error("User exists already!");
        throw error;
      }
      const hashedPw = await bcrypt.hash(editUserInput.password, 12);
      user.name = editUserInput.name;
      user.password = hashedPw;
      user.email = editUserInput.email;
      const updateUser: any = await user.save();
      return {
        ...updateUser._doc,
        _id: updateUser._id.toString(),
        createdAt: updateUser.createdAt.toISOString(),
        updatedAt: updateUser.updatedAt.toISOString(),
      };
    } catch (err) {
      console.log(err);
    }
  },
  deleteUser: async function ({ id }, req) {
    try {
      await User.findByIdAndDelete(id);
      return true;
    } catch (err) {
      console.log("err", err);
    }
  },
};
