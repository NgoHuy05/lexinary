  const mongoose = require("mongoose");

  const topicSchema = new mongoose.Schema(
    {
      title: { type: String },
      description: { type: String },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      flashcards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard' }],
      visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'private',
      },
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("Topic", topicSchema);
