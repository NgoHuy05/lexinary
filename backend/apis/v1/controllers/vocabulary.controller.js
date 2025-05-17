const Vocabulary = require("../models/Vocabulary.models");
const Lesson = require("../models/Lesson.models");

// Get all vocabulary
exports.getAllVocabulary = async (req, res) => {
    try {
      const vocabulary = await Vocabulary.find().populate("lesson");
      res.status(200).json(vocabulary);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get vocabulary by ID
  exports.getVocabularyById = async (req, res) => {
    try {
      const vocabulary = await Vocabulary.findById(req.params.id).populate("lesson");
      if (!vocabulary) {
        return res.status(404).json({ message: "Vocabulary not found" });
      }
      res.status(200).json(vocabulary);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  exports.getVocabularyByLesson = async (req, res) => {
    try {
      const { lessonId } = req.params;
  
      const vocabularies = await Vocabulary.find({ lesson: lessonId });
      res.status(200).json(vocabularies);
    } catch (error) {
      console.error("Server error getVocabulary:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
// Create new vocabulary
exports.createVocabulary = async (req, res) => {
  try {
    const vocabularyArray = req.body; // Mảng từ vựng

    const savedVocabulary = await Vocabulary.insertMany(vocabularyArray);

    // Cập nhật lesson
    const lessonId = vocabularyArray[0].lesson; // 🛠 đúng field là 'lesson' chứ không phải 'lessonId'
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(400).json({ message: "Lesson không tồn tại" });
    }

    lesson.vocabulary.push(...savedVocabulary.map(vocab => vocab._id));
    await lesson.save();

    res.status(201).json(savedVocabulary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Update vocabulary
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



// Delete vocabulary
exports.deleteVocabulary = async (req, res) => {
    try {
      const vocabulary = await Vocabulary.findByIdAndDelete(req.params.id);
      if (!vocabulary) {
        return res.status(404).json({ message: "Vocabulary not found" });
      }
  
      // Sau khi xóa từ vựng, xóa luôn ID từ vựng đó trong Lesson
      await Lesson.findByIdAndUpdate(
        vocabulary.lesson, // Lấy lessonId từ vocabulary
        { $pull: { vocabulary: vocabulary._id } } // Pull từ mảng vocabulary trong Lesson
      );
  
      res.status(200).json({ message: "Vocabulary deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  