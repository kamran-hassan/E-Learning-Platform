const mongoose = require("mongoose");

const Course = mongoose.model(
    "Course",
    new mongoose.Schema({
        course_name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true
        },
        created_on: {
          type: Date,
          default: Date.now,
        },
        course_content: {
          type: mongoose.Schema.Types.Mixed,
        },
        created_by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // Reference to the User model
          required: true,
        }
      }));

module.exports = Course;