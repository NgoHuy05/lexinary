const express = require("express");
const router = express.Router();
const sentenceController = require("../controllers/sentence.controller");

// [GET] /api/v1/sentences/
// Lấy tất cả câu mẫu
router.get("/", sentenceController.getAllSentences);

// [GET] /api/v1/sentences/lesson/:lessonId
// Lấy câu mẫu theo lessonId
router.get("/lesson/:lessonId", sentenceController.getSentenceByLesson);

// [GET] /api/v1/sentences/:sentenceId
// Lấy câu mẫu theo sentenceId
router.get("/:sentenceId", sentenceController.getSentenceById);

// [POST] /api/v1/sentences/create
// Tạo câu mẫu mới
router.post("/create", sentenceController.createSentence);

// [PATCH] /api/v1/sentences/update/:sentenceId
// Cập nhật câu mẫu theo sentenceId
router.patch("/update/:sentenceId", sentenceController.updateSentence);

// [DELETE] /api/v1/sentences/delete/:sentenceId
// Xóa câu mẫu theo sentenceId
router.delete("/delete/:sentenceId", sentenceController.deleteSentence);

module.exports = router;
