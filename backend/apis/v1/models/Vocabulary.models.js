const mongoose = require("mongoose");

const vocabularySchema = new mongoose.Schema(
  {
    word: { type: String, required: true },         
    meaning: { type: String, required: true },      
    pronunciation: { type: String },                
    example: { type: String },                       
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true }, 
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Vocabulary = mongoose.model("Vocabulary", vocabularySchema);
module.exports = Vocabulary;
