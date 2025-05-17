const express = require("express");
const historyController = require("../controllers/history.controller");

const router = express.Router();

// Tạo lịch sử làm bài
router.post("/create", historyController.createHistory);

// Lấy lịch sử làm bài theo userId
router.get("/user/:userId/course/:courseId/chapter/:chapterId/lesson/:lessonId", historyController.getHistoryByUser);

// Xóa lịch sử làm bài
router.delete("/delete/:id", historyController.deleteHistory);

module.exports = router;
