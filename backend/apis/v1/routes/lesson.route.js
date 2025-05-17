const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lesson.controller");

// Routes cho Lesson
router.get("/:chapterId", lessonController.getLessons);  // Lấy danh sách bài học theo chương học
router.get("/detail/:id", lessonController.getLessonDetail);  // Lấy chi tiết bài học theo lessonId

router.post("/create", lessonController.createLesson);  // Tạo bài học
router.patch("/update/:id", lessonController.updateLesson);  // Cập nhật bài học
router.delete("/delete/:id", lessonController.deleteLesson);  // Xóa bài học

module.exports = router;
