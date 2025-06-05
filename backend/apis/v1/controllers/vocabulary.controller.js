const Vocabulary = require("../models/Vocabulary.models");
const Lesson = require("../models/Lesson.models");

// Lấy tất cả từ vựng, đồng thời populate thông tin lesson
exports.getAllVocabulary = async (req, res) => {
  try {
    const vocabulary = await Vocabulary.find().populate("lesson").sort({ word: 1});
    res.status(200).json(vocabulary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy từ vựng theo ID, nếu không tìm thấy trả về lỗi 404
exports.getVocabularyById = async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findById(req.params.id).populate("lesson").sort({ word: 1});
    if (!vocabulary) {
      return res.status(404).json({ message: "Vocabulary not found" });
    }
    res.status(200).json(vocabulary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy danh sách từ vựng theo lessonId
exports.getVocabularyByLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const vocabularies = await Vocabulary.find({ lesson: lessonId }).sort({ word: 1});
    res.status(200).json(vocabularies);
  } catch (error) {
    console.error("Server error getVocabulary:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Tạo nhiều từ vựng cùng lúc, đồng thời cập nhật mảng vocabulary trong Lesson
exports.createVocabulary = async (req, res) => {
  try {
    const vocabularyArray = req.body;

    // Lưu mảng từ vựng vào database
    const savedVocabulary = await Vocabulary.insertMany(vocabularyArray);

    // Lấy lessonId từ từ vựng đầu tiên trong mảng
    const lessonId = vocabularyArray[0].lesson;
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(400).json({ message: "Lesson không tồn tại" });
    }

    // Cập nhật danh sách từ vựng trong lesson
    lesson.vocabulary.push(...savedVocabulary.map(vocab => vocab._id));
    await lesson.save();

    res.status(201).json(savedVocabulary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật từ vựng theo ID, trả về bản ghi mới sau khi cập nhật
exports.updateVocabulary = async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!vocabulary) {
      return res.status(404).json({ message: "Vocabulary not found" });
    }
    res.status(200).json(vocabulary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa từ vựng theo ID và cập nhật lại mảng vocabulary trong Lesson
exports.deleteVocabulary = async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findByIdAndDelete(req.params.id);
    if (!vocabulary) {
      return res.status(404).json({ message: "Vocabulary not found" });
    }

    // Xóa id từ vựng khỏi lesson
    await Lesson.findByIdAndUpdate(
      vocabulary.lesson,
      { $pull: { vocabulary: vocabulary._id } }
    );

    res.status(200).json({ message: "Vocabulary deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
