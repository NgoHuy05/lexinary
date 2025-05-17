const mongoose = require("mongoose");

const grammarSchema = new mongoose.Schema({
    type: { type: String, required: true },
    structure: { type: String, required: true },
    explanation: { type: String, required: true }, // đoạn mô tả HTML hoặc văn bản dài
    examples: { type: String }, // ví dụ ngắn
    tips: [{ type: String }], // phần chú ý, dấu hiệu nhận biết,...
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
    deleted: { type: Boolean, default: false }
  }, { timestamps: true });
const Grammar = mongoose.model("Grammar", grammarSchema);
module.exports = Grammar;