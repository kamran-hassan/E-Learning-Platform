const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
      full_name : {
        type: String,
        required : true,
      },
      dateofbirth: Date,
      email: {
        type: String,
        required : true,
        unique: true
      },
      password: {
        type: String,
        required : true
      },
    })
  );
  
  module.exports = User;