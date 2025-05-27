const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  order: { type: Number, default: 0 }, 
  deleted: { type: Boolean, default: false }
}, { timestamps: true });

const Chapter = mongoose.model("Chapter", chapterSchema);
module.exports = Chapter;
