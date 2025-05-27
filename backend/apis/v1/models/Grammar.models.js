const mongoose = require("mongoose");

const grammarSchema = new mongoose.Schema({
    type: { type: String, required: true },
    structure: { type: String, required: true },
    explanation: { type: String, required: true }, 
    examples: { type: String },
    tips: [{ type: String }],
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
    deleted: { type: Boolean, default: false }
  }, { timestamps: true });
const Grammar = mongoose.model("Grammar", grammarSchema);
module.exports = Grammar;