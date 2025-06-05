const Chapter = require("../models/Chapter.models");
const Course = require("../models/Course.models");


// Lấy danh sách chương học của khóa học
module.exports.getChapters = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Tìm khóa học và lấy các chương học
    const chapters = await Chapter.find({ course: courseId }).populate("lessons").sort({ order: 1 });
    res.json(chapters);
  } catch (error) {
    console.error("Lỗi khi lấy chương học:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
module.exports.getAllChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find().populate("lessons");
    res.json(chapters);
  } catch (error) {
    console.error("Lỗi khi lấy tất cả chương học:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
// Lấy chi tiết chương học
module.exports.getChapterDetail = async (req, res) => {
  try {
    const chapterId = req.params.id;
    const chapter = await Chapter.findById(chapterId)
      .populate('lessons');

    if (!chapter) {
      return res.status(404).json({ message: "Chương học không tồn tại" });
    }

    res.json(chapter);
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết chương học:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};


// Tạo các chương học mới
module.exports.createChapter = async (req, res) => {
  try {
    const chaptersData = req.body;
    const savedChapters = await Chapter.insertMany(chaptersData);
    const courseId = chaptersData[0].course;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Khóa học không tồn tại" });
    }

    // Cập nhật khóa học với các chương học mới
    course.chapters.push(...savedChapters.map(chapter => chapter._id));
    await course.save();

    res.status(201).json({ message: "Tạo chương học thành công", chapters: savedChapters });
  } catch (error) {
    console.error("Lỗi khi tạo chương học:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Chỉnh sửa chương học
module.exports.updateChapter = async (req, res) => {
  try {
    const { title, description, order } = req.body;
    const chapterId = req.params.id;

    const updatedChapter = await Chapter.findByIdAndUpdate(chapterId, { title, description, order }, { new: true });

    if (!updatedChapter) {
      return res.status(404).json({ message: "Chương học không tồn tại" });
    }

    res.json({ message: "Cập nhật chương học thành công", chapter: updatedChapter });
  } catch (error) {
    console.error("Lỗi khi chỉnh sửa chương học:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
// Xóa chương học 
module.exports.deleteChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndDelete(req.params.id);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    // Cập nhật khóa học, xóa chapter khỏi mảng chapter trong Course
    await Course.findByIdAndUpdate(
      chapter.course,
      { $pull: { chapters: chapter._id } }
    );

    res.json({ message: "Chương học đã bị xóa và khóa học được cập nhật" });
  } catch (error) {
    console.error("Lỗi khi xóa chương học:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
