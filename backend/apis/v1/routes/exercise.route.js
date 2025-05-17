const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/exercise.controller");

// Tạo mới bài tập
router.post("/create", exerciseController.createExercise);

// Lấy tất cả bài tập
router.get("/", exerciseController.getAllExercises);

// Lấy bài tập theo lessonId
router.get("/lesson/:lessonId", exerciseController.getExercisesByLesson);

// Lấy bài tập theo ID
router.get("/detail/:id", exerciseController.getExerciseById);

// Cập nhật bài tập
router.put("/update/:id", exerciseController.updateExercise);

// Xóa bài tập
router.delete("/delete/:id", exerciseController.deleteExercise);

module.exports = router;
