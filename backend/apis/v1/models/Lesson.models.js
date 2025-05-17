const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },  // ✅ Thêm trường này
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
    vocabulary: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vocabulary" }],
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }],
    grammar: [{ type: mongoose.Schema.Types.ObjectId, ref: "Grammar" }],
    sentence: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sentence"}],
    order: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;
