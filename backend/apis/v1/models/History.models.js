const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
  correctCount: { type: Number, default: 0 },
  incorrectCount: { type: Number, default: 0 },
  incorrectAnswers: [
    {
      question: String,
      correctAnswer: String,
      userAnswer: String, 
    },
  ],
  allAnswers: [
    {
      exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" },
      selectedAnswer: { type: String },  
      correctAnswer: { type: String },
      question: { type: String },
    },
  ],
  completedAt: { type: Date, default: Date.now },
},
{ timestamps: true }
);

const History = mongoose.model("History", historySchema);

module.exports = History;
