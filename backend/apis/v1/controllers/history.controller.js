const History = require("../models/History.models");
const User = require("../models/User.models");
const Course = require("../models/Course.models");
const Chapter = require("../models/Chapter.models");
const Lesson = require("../models/Lesson.models");
const Exercise = require("../models/Exercise.models");

const createHistory = async (req, res) => {
  try {
    const { userId, courseId, chapterId, lessonId, correctCount, incorrectCount, incorrectAnswers, allAnswers } = req.body;

    // Kiểm tra nếu người dùng, khóa học, chương, bài học tồn tại
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

const getHistoryByUser = async (req, res) => {
    try {
      const { userId, courseId, chapterId, lessonId } = req.params; // Lấy tất cả các tham số cần thiết từ URL
      
      // Lấy tất cả lịch sử làm bài của người dùng với các tham số courseId, chapterId, lessonId
      const history = await History.find({ 
        userId, 
        courseId, 
        chapterId, 
        lessonId 
      })
        .populate("courseId", "title description") // Lấy thông tin khóa học
        .populate("chapterId", "title") // Lấy thông tin chương
        .populate("lessonId", "title description") // Lấy thông tin bài học
        .populate("userId", "name email") // Lấy thông tin người dùng
        .sort({ completedAt: -1 }); // Sắp xếp theo thời gian làm bài
  

      res.status(200).json({ history });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi khi lấy lịch sử làm bài" });
    }
  };
  
// Xóa lịch sử làm bài theo ID
const deleteHistory = async (req, res) => {
    try {
      const { id } = req.params;  // Lấy id từ tham số URL
      const history = await History.findByIdAndDelete(id);  // Tìm và xóa lịch sử làm bài theo id
  
      if (!history) {
        return res.status(404).json({ message: "Không tìm thấy lịch sử làm bài cần xóa" });
      }
  
      return res.status(200).json({ message: "Đã xóa lịch sử làm bài thành công" });
    } catch (error) {
      console.error("Lỗi khi xóa lịch sử làm bài:", error);
      return res.status(500).json({ message: "Có lỗi xảy ra khi xóa lịch sử làm bài" });
    }
  };
  
module.exports = {
  createHistory,
  getHistoryByUser,
  deleteHistory,
};
