const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  tasks: [taskSchema],  // Thêm mảng tasks vào schema ghi chú
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
