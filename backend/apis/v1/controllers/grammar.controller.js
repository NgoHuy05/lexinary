const mongoose = require("mongoose");
const Grammar = require("../models/Grammar.models");
const Lesson = require("../models/Lesson.models.js");

// Lấy tất cả ngữ pháp
module.exports.getAllGrammars = async (req, res) => {
  try {
    const grammars = await Grammar.find().populate("lesson");
    res.status(200).json(grammars);
  } catch (error) {
    res.status(500).json({ message: "Không thể lấy ngữ pháp", error });
  }
};

// Lấy ngữ pháp theo lessonId
module.exports.getGrammarByLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const grammars = await Grammar.find({ lesson: lessonId }).populate("lesson");
    if (!grammars || grammars.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy ngữ pháp cho bài học này" });
    }
    res.status(200).json(grammars);
  } catch (error) {
    res.status(500).json({ message: "Không thể lấy ngữ pháp", error });
  }
};

// Lấy ngữ pháp theo ID
module.exports.getGrammarById = async (req, res) => {
  const { grammarId } = req.params;
  try {
    const grammar = await Grammar.findById(grammarId).populate("lesson");
    if (!grammar) {
      return res.status(404).json({ message: "Ngữ pháp không tồn tại" });
    }
    res.status(200).json(grammar);
  } catch (error) {
    res.status(500).json({ message: "Không thể lấy ngữ pháp", error });
  }
};

// Thêm một ngữ pháp mới
module.exports.createGrammar = async (req, res) => {
  try {
    const grammarsData = req.body;
    const lessonId = grammarsData[0].lesson;
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(400).json({ message: "Lesson không tồn tại" });
    }
    const savedGrammars = await Grammar.insertMany(grammarsData);
    lesson.grammar = lesson.grammar.concat(savedGrammars.map(g => g._id));
    await lesson.save();

    res.status(201).json({ message: "Tạo ngữ pháp thành công", grammars: savedGrammars });
  } catch (error) {
    console.error("Lỗi khi tạo ngữ pháp:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Cập nhật ngữ pháp
module.exports.updateGrammar = async (req, res) => {
  const { grammarId } = req.params;
  const { title, structure, explanation, examples, tips, lesson } = req.body;

  if (!Array.isArray(title) || !Array.isArray(explanation)) {
    return res.status(400).json({ message: "title và explanation phải là mảng." });
  }

  try {
    const updatedGrammar = await Grammar.findByIdAndUpdate(
      grammarId,
      { title, explanation, examples, tips, lesson },
      { new: true }
    );
    if (!updatedGrammar) {
      return res.status(404).json({ message: "Ngữ pháp không tồn tại" });
    }
    res.status(200).json(updatedGrammar);
  } catch (error) {
    res.status(500).json({ message: "Không thể cập nhật ngữ pháp", error });
  }
};

// Xóa ngữ pháp
module.exports.deleteGrammar = async (req, res) => {
  const { grammarId } = req.params;
  try {
    const deletedGrammar = await Grammar.findByIdAndDelete(grammarId);
    if (!deletedGrammar) {
      return res.status(404).json({ message: "Ngữ pháp không tồn tại" });
    }

    const lesson = await Lesson.findById(deletedGrammar.lesson);
    if (lesson) {
      lesson.grammar = lesson.grammar.filter(g => g.toString() !== grammarId);
      await lesson.save();
    }

    res.status(200).json({ message: "Ngữ pháp đã được xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: "Không thể xóa ngữ pháp", error });
  }
};
