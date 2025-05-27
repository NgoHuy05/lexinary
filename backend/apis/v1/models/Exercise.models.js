const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },       
    options: [{ type: String }],                       
    correctAnswer: { type: String, required: true },   
    type: { 
      type: String, 
      enum: ["multiple-choice", "fill-in-the-blank"], 
      default: "multiple-choice" 
    },                                                
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
