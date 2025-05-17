const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },        // câu hỏi
    options: [{ type: String }],                       // các lựa chọn (nếu bài tập trắc nghiệm)
    correctAnswer: { type: String, required: true },   // đáp án đúng
    type: { 
      type: String, 
      enum: ["multiple-choice", "fill-in-the-blank"], 
      default: "multiple-choice" 
    },                                                 // loại bài tập
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true }, // thuộc bài học nào
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
