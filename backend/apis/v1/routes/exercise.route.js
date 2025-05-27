const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/exercise.controller");

// [POST] /api/v1/exercises/create - Tạo mới bài tập
router.post("/create", exerciseController.createExercise);

// [GET] /api/v1/exercises/ - Lấy tất cả bài tập
router.get("/", exerciseController.getAllExercises);

// [GET] /api/v1/exercises/lesson/:lessonId - Lấy danh sách bài tập theo lessonId
router.get("/lesson/:lessonId", exerciseController.getExercisesByLesson);

// [GET] /api/v1/exercises/detail/:id - Lấy chi tiết bài tập theo ID
router.get("/detail/:id", exerciseController.getExerciseById);

// [PUT] /api/v1/exercises/update/:id - Cập nhật bài tập theo ID
router.put("/update/:id", exerciseController.updateExercise);

// [DELETE] /api/v1/exercises/delete/:id - Xóa bài tập theo ID
router.delete("/delete/:id", exerciseController.deleteExercise);

module.exports = router;
