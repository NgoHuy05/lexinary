const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lessons: [
      {
        lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
        completed: { type: Boolean, default: false },
      }
    ],
    streak: { type: Number, default: 0 },
    lastStudyDate: { type: Date },
    studyHistory: [
      {
        date: { type: Date, required: true },
        count: { type: Number, default: 1 }, 
      }
    ],
  },
  { timestamps: true }
);

const Progress = mongoose.model("Progress", progressSchema);
module.exports = Progress;
