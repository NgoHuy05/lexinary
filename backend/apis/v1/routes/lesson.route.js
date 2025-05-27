const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lesson.controller");

// [GET] /api/v1/lessons/:chapterId - Lấy danh sách bài học theo chương học
router.get("/:chapterId", lessonController.getLessons);

// [GET] /api/v1/lessons/detail/:id - Lấy chi tiết bài học theo lessonId
router.get("/detail/:id", lessonController.getLessonDetail);

// [POST] /api/v1/lessons/create - Tạo bài học mới
router.post("/create", lessonController.createLesson);

// [PATCH] /api/v1/lessons/update/:id - Cập nhật bài học theo lessonId
router.patch("/update/:id", lessonController.updateLesson);

// [DELETE] /api/v1/lessons/delete/:id - Xóa bài học theo lessonId
router.delete("/delete/:id", lessonController.deleteLesson);

module.exports = router;
