const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema(
  {
    term: { type: String, required: true },
    definition: { type: String, required: true },
    example: { type: String },
    pronunciation: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true }, // 👉 Thêm dòng này
  },
  { timestamps: true }
);
const Flashcard = mongoose.model("Flashcard", flashcardSchema);
module.exports = Flashcard;