const Sentence = require("../models/Sentence.models");
const Lesson = require("../models/Lesson.models");

// Lấy tất cả câu
module.exports.getAllSentences = async (req, res) => {
  try {
    const sentences = await Sentence.find().populate("lesson");
    res.status(200).json(sentences);
  } catch (error) {
    res.status(500).json({ message: "Không thể lấy câu", error });
  }
};

// Lấy câu theo ID
module.exports.getSentenceById = async (req, res) => {
  const { sentenceId } = req.params;
  try {
    const sentence = await Sentence.findById(sentenceId).populate("lesson");
    if (!sentence) {
      return res.status(404).json({ message: "Câu không tồn tại" });
    }
    res.status(200).json(sentence);
  } catch (error) {
    res.status(500).json({ message: "Không thể lấy câu", error });
  }
};

// Lấy câu theo lessonId
module.exports.getSentenceByLesson = async (req, res) => {
  const { lessonId } = req.params;
  try {
    const sentences = await Sentence.find({ lesson: lessonId }).populate("lesson");
    if (!sentences) {
      return res.status(404).json({ message: "Không tìm thấy câu nào cho bài học này" });
    }
    res.status(200).json(sentences);
  } catch (error) {
    res.status(500).json({ message: "Không thể lấy câu", error });
  }
};
// Thêm một hoặc nhiều câu mới
module.exports.createSentence = async (req, res) => {
  try {
    const sentenceArray = req.body;

    const savedSentences = await Sentence.insertMany(sentenceArray);

    const lessonId = sentenceArray[0].lesson;
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(400).json({ message: "Lesson không tồn tại" });
    }

    lesson.sentence.push(...savedSentences.map(sentence => sentence._id));
    await lesson.save();

    res.status(201).json(savedSentences);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật câu
module.exports.updateSentence = async (req, res) => {
  try {
    const updatedSentence = await Sentence.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSentence) {
      return res.status(404).json({ message: "Sentence không tồn tại" });
    }
    res.status(200).json(updatedSentence);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa câu
module.exports.deleteSentence = async (req, res) => {
  try {
    const sentence = await Sentence.findByIdAndDelete(req.params.id);
    if (!sentence) {
      return res.status(404).json({ message: "Sentence không tồn tại" });
    }

    // Xoá ID câu khỏi lesson
    await Lesson.findByIdAndUpdate(
      sentence.lesson,
      { $pull: { sentence: sentence._id } }
    );

    res.status(200).json({ message: "Sentence đã được xoá thành công" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
