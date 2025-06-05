const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  categoryType: {
    type: String,
    enum: ["Skill", "Level", "Purpose"],
    required: true
  },
  color: { type: String },
  icon: { type: String },
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }], 
  order: { type: Number, default: 0 }, 
  status: { type: String, default: "pending" },
  listUser: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  deleted: { type: Boolean, default: false },
  target: { type: String },
  content: { type: String },
  audience: { type: String }
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
