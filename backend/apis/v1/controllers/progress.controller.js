const Progress = require("../models/ProgressLearning.models");
const Lesson = require("../models/Lesson.models");

// Tạo tiến trình học cho người dùng khi đăng nhập lần đầu
module.exports.createProgress = async (req, res) => {
  try {
    const { userId } = req.body; // Lấy userId từ request body
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const lessons = [];
    const lessonIds = await Lesson.find({});

    lessonIds.forEach((lesson) => {
      lessons.push({
        lesson: lesson._id,
        completed: false,
      });
    });

    const newProgress = new Progress({
      user: userId,
      lessons: lessons,
      streak: 0,
      lastStudyDate: null,
    });

    await newProgress.save();
    res.status(201).json({ message: "Progress created successfully!", progress: newProgress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating progress" });
  }
};

// Lấy tiến trình học của người dùng
module.exports.getUserProgress = async (req, res) => {
  try {
    const { userId } = req.query;  // Lấy userId từ query parameters
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const progress = await Progress.findOne({ user: userId });
    if (!progress) {
      return res.status(200).json({ message: "Progress not found" });
    }

    res.status(200).json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving progress" });
  }
};

module.exports.updateProgress = async (req, res) => {
  try {
    const { userId, lessonId } = req.body;

    if (!userId || !lessonId) {
      return res.status(400).json({ message: "User ID và Lesson ID là bắt buộc." });
    }

    // Tìm tiến trình học của user
    const progress = await Progress.findOne({ user: userId });
    if (!progress) {
      return res.status(404).json({ message: "Không tìm thấy tiến trình học." });
    }

    // Tìm xem bài học đó đã tồn tại trong tiến trình chưa
    const lessonIndex = progress.lessons.findIndex(
      (item) => item.lesson.toString() === lessonId
    );

    if (lessonIndex !== -1) {
      progress.lessons[lessonIndex].completed = true;
    } else {
      // Nếu chưa có, thêm mới vào danh sách
      progress.lessons.push({
        lesson: lessonId,
        completed: true,
      });
    }

    // === TÍNH STREAK ===
    const today = new Date();
    const lastDate = progress.lastStudyDate ? new Date(progress.lastStudyDate) : null;
    const diffDays = lastDate ? Math.floor((today - lastDate) / (1000 * 60 * 60 * 24)) : null;

    if (diffDays === 1) {
      progress.streak += 1;
    } else if (diffDays > 1 || lastDate === null) {
      progress.streak = 1;
    }

    progress.lastStudyDate = today;

    // === CẬP NHẬT STUDY HISTORY ===
    const todayDateStr = today.toISOString().split("T")[0]; // "YYYY-MM-DD"
    const existingEntry = progress.studyHistory.find(entry =>
      new Date(entry.date).toISOString().split("T")[0] === todayDateStr
    );

    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      progress.studyHistory.push({ date: today, count: 1 });
    }

    await progress.save();

    res.status(200).json({ message: "Đã cập nhật tiến trình.", progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi cập nhật tiến trình." });
  }
};
