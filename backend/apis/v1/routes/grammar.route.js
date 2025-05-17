const express = require("express");
const router = express.Router();
const controller = require("../controllers/grammar.controller");

// Lấy tất cả ngữ pháp
router.get("/", controller.getAllGrammars);

// Lấy ngữ pháp theo lessonId
router.get("/lesson/:lessonId", controller.getGrammarByLesson);

// Lấy ngữ pháp theo ID
router.get("/:grammarId", controller.getGrammarById);

// Thêm ngữ pháp mới
router.post("/create", controller.createGrammar);

// Cập nhật ngữ pháp
router.patch("/edit/:grammarId", controller.updateGrammar);

// Xóa ngữ pháp
router.delete("/delete/:grammarId", controller.deleteGrammar);

module.exports = router;
