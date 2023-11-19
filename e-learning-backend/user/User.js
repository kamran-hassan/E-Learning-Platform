const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
      full_name: String,
      dateofbirth: Date,
      email: String,
      password: String,
    })
  );
  
  module.exports = User;