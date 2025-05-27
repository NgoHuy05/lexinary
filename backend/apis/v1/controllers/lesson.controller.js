const Lesson = require("../models/Lesson.models");
const Chapter = require("../models/Chapter.models");

// Lấy danh sách bài học của chương
module.exports.getLessons = async (req, res) => {
  try {
    const chapterId = req.params.chapterId;

    const chapter = await Chapter.findById(chapterId).populate({
      path: "lessons",
      match: { deleted: false },
    });

    if (!chapter) {
      return res.status(404).json({ message: "Không tìm thấy chương học" });
    }

    res.json(chapter.lessons);
  } catch (error) {
    console.error("Lỗi khi lấy bài học:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy chi tiết bài học 
module.exports.getLessonDetail = async (req, res) => {
  try {
    const lessonId = req.params.id;

    const lesson = await Lesson.findById(lessonId)
      .populate("vocabulary")
      .populate("exercises")
      .populate("grammar")
      .populate("sentence")
      .populate("course", "title")
      .populate("chapter", "title");

    if (!lesson || lesson.deleted) {
      return res.status(404).json({ message: "Bài học không tồn tại" });
    }

    res.json(lesson);
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết bài học:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Tạo nhiều bài học
module.exports.createLesson = async (req, res) => {
  try {
    const lessonsData = req.body;

    const chapter = await Chapter.findById(lessonsData[0].chapterId);
    if (!chapter) {
      return res.status(400).json({ message: "Chương học không tồn tại" });
    }

    const courseId = lessonsData[0].courseId;

    const newLessons = lessonsData.map(lesson => ({
      title: lesson.title,
      description: lesson.description,
      course: courseId,
      chapter: lesson.chapterId,
      order: lesson.order,
      vocabulary: lesson.vocabulary || [],
      exercises: lesson.exercises || [],
      grammar: lesson.grammar || [],
      sentence: lesson.sentence || []
    }));

    const savedLessons = await Lesson.insertMany(newLessons);
    chapter.lessons.push(...savedLessons.map(lesson => lesson._id));
    await chapter.save();

    res.status(201).json({ message: "Tạo bài học thành công", lessons: savedLessons });
  } catch (error) {
    console.error("Lỗi khi tạo bài học:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

//  Chỉnh sửa bài học
module.exports.updateLesson = async (req, res) => {
  try {
    const {
      title,
      description,
      vocabulary,
      exercises,
      grammar,
      sentence,
      order,
      course
    } = req.body;

    const lessonId = req.params.id;

    const updatedLesson = await Lesson.findByIdAndUpdate(
      lessonId,
      {
        title,
        description,
        vocabulary,
        exercises,
        grammar,
        sentence,
        order,
        course,
      },
      { new: true }
    );

    if (!updatedLesson) {
      return res.status(404).json({ message: "Bài học không tồn tại" });
    }

    res.json({ message: "Cập nhật bài học thành công", lesson: updatedLesson });
  } catch (error) {
    console.error("Lỗi khi chỉnh sửa bài học:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Xoá bài học
module.exports.deleteLesson = async (req, res) => {
  try {
    const lessonId = req.params.id;

    // Tìm và xoá bài học
    const deletedLesson = await Lesson.findByIdAndDelete(lessonId);

    if (!deletedLesson) {
      return res.status(404).json({ message: "Bài học không tồn tại" });
    }

    // Gỡ bài học ra khỏi chương
    await Chapter.findByIdAndUpdate(deletedLesson.chapter, {
      $pull: { lessons: deletedLesson._id },
    });

    res.json({ message: "Bài học đã bị xoá vĩnh viễn" });
  } catch (error) {
    console.error("Lỗi khi xoá bài học:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
