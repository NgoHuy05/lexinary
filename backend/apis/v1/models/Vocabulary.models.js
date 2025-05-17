const mongoose = require("mongoose");

const vocabularySchema = new mongoose.Schema(
  {
    word: { type: String, required: true },         // từ tiếng Anh
    meaning: { type: String, required: true },       // nghĩa tiếng Việt
    pronunciation: { type: String },                 // cách đọc (nếu cần)
    example: { type: String },                       // câu ví dụ
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true }, // thuộc bài học nào
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Vocabulary = mongoose.model("Vocabulary", vocabularySchema);
module.exports = Vocabulary;
