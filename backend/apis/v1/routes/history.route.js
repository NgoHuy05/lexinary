const express = require("express");
const historyController = require("../controllers/history.controller");

const router = express.Router();

// [POST] /api/v1/histories/create - Tạo mới lịch sử làm bài
router.post("/create", historyController.createHistory);

// [GET] /api/v1/histories/user/:userId/course/:courseId/chapter/:chapterId/lesson/:lessonId 
// Lấy lịch sử làm bài theo userId, courseId, chapterId, lessonId
router.get("/user/:userId/course/:courseId/chapter/:chapterId/lesson/:lessonId", historyController.getHistoryByUser);

// [DELETE] /api/v1/histories/delete/:id - Xóa lịch sử làm bài theo id
router.delete("/delete/:id", historyController.deleteHistory);

module.exports = router;
