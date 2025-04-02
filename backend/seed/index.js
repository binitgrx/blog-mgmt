
const { user, blogs } = require("./data");
const mongoose = require("mongoose");
const blogController = require("../modules/blogs/blog.controller");
const userModel = require("../modules/users/user.model");
const { hashPassword } = require("../utils/bcrypt");

const setup = {
  initialize: async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/myBlogApp");
      console.log("Starting user Seed...");
      const userPayload = user;
      userPayload.password = hashPassword(user.password);
      const dbUser = await userModel.create(userPayload);
      console.log("Finished user Seed...");

      console.log("Starting blog Seed...");
      for (let i = 0; i < blogs.length; i++) {
        blogs[i].currentUser = dbUser._id;
        await blogController.create(blogs[i]);
      }
      console.log("Finished blog Seed...");
    } catch (e) {
      console.log(e);
    }
  },
};

setup.initialize();