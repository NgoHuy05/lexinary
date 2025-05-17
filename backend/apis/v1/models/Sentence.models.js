const mongoose = require("mongoose");

const sentenceSchema = new mongoose.Schema(
  {
    sentence: { type: String, required: true }, // Nội dung câu
    meaning: { type: String }, // Dịch nghĩa câu
    example: { type: String }, // Ví dụ sử dụng câu
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true }, 
    deleted: { type: Boolean, default: false } // Trạng thái đã bị xóa
  },
  { timestamps: true }
);

const Sentence = mongoose.model("Sentence", sentenceSchema);
module.exports = Sentence;
