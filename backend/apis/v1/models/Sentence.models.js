const mongoose = require("mongoose");

const sentenceSchema = new mongoose.Schema(
  {
    sentence: { type: String, required: true }, 
    meaning: { type: String }, 
    example: { type: String }, 
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true }, 
    deleted: { type: Boolean, default: false } 
  },
  { timestamps: true }
);

const Sentence = mongoose.model("Sentence", sentenceSchema);
module.exports = Sentence;
