const express = require("express");
const router = express.Router();
const vocabularyController = require("../controllers/vocabulary.controller");

// [GET] /api/v1/vocabularies/ - Lấy tất cả từ vựng
router.get("/", vocabularyController.getAllVocabulary);

// [GET] /api/v1/vocabularies/lesson/:lessonId - Lấy từ vựng theo lessonId
router.get("/lesson/:lessonId", vocabularyController.getVocabularyByLesson);

// [GET] /api/v1/vocabularies/:id - Lấy từ vựng theo ID
router.get("/:id", vocabularyController.getVocabularyById);

// [POST] /api/v1/vocabularies/create - Tạo từ vựng mới
router.post("/create", vocabularyController.createVocabulary);

// [PATCH] /api/v1/vocabularies/update/:id - Cập nhật từ vựng theo ID
router.patch("/update/:id", vocabularyController.updateVocabulary);

// [DELETE] /api/v1/vocabularies/delete/:id - Xóa từ vựng theo ID
router.delete("/delete/:id", vocabularyController.deleteVocabulary);

module.exports = router;
