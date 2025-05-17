const express = require("express");
const router = express.Router();
const vocabularyController = require("../controllers/vocabulary.controller");

router.get("/", vocabularyController.getAllVocabulary);   // Lấy tất cả từ vựng
router.get("/lesson/:lessonId", vocabularyController.getVocabularyByLesson); // Lấy từ vựng theo lessonId
router.get("/:id", vocabularyController.getVocabularyById); // Lấy từ vựng theo ID
router.post("/create", vocabularyController.createVocabulary);  // Tạo từ vựng
router.patch("/update/:id", vocabularyController.updateVocabulary);  // Cập nhật từ vựng
router.delete("/delete/:id", vocabularyController.deleteVocabulary); // Xóa từ vựng

module.exports = router;
