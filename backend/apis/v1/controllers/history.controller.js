const History = require("../models/History.models");
const User = require("../models/User.models");
const Course = require("../models/Course.models");
const Chapter = require("../models/Chapter.models");
const Lesson = require("../models/Lesson.models");
const Exercise = require("../models/Exercise.models");

module.exports.createHistory = async (req, res) => {
  try {
    const { userId, courseId, chapterId, lessonId, correctCount, incorrectCount, incorrectAnswers, allAnswers } = req.body;

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);
    const chapter = await Chapter.findById(chapterId);
    const lesson = await Lesson.findById(lessonId);

    if (!user || !course || !chapter || !lesson) {
      return res.status(404).json({ message: "User, Course, Chapter, or Lesson not found" });
    }

    // Tạo mới bản ghi lịch sử làm bài
    const newHistory = new History({
      userId,
      courseId,
      chapterId,
      lessonId,
      correctCount,
      incorrectCount,
      incorrectAnswers,
      allAnswers,
      completedAt: new Date(),
    });

    await newHistory.save();
    res.status(201).json({ message: "History created successfully", history: newHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi tạo lịch sử làm bài" });
  }
};

module.exports.getHistoryByUser = async (req, res) => {
  try {
    const { userId, courseId, chapterId, lessonId } = req.params;
    const history = await History.find({
      userId,
      courseId,
      chapterId,
      lessonId
    })
      .populate("courseId", "title description")
      .populate("chapterId", "title")
      .populate("lessonId", "title description")
      .populate("userId", "name email")
      .sort({ completedAt: -1 });
    res.status(200).json({ history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy lịch sử làm bài" });
  }
};

// Xóa lịch sử làm bài theo ID
module.exports.deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const history = await History.findByIdAndDelete(id);

    if (!history) {
      return res.status(404).json({ message: "Không tìm thấy lịch sử làm bài cần xóa" });
    }

    return res.status(200).json({ message: "Đã xóa lịch sử làm bài thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa lịch sử làm bài:", error);
    return res.status(500).json({ message: "Có lỗi xảy ra khi xóa lịch sử làm bài" });
  }
};

