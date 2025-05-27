const express = require("express");
const router = express.Router();
const controller = require("../controllers/grammar.controller");

// [GET] /api/v1/grammars/ - Lấy tất cả ngữ pháp
router.get("/", controller.getAllGrammars);

// [GET] /api/v1/grammars/lesson/:lessonId - Lấy danh sách ngữ pháp theo lessonId
router.get("/lesson/:lessonId", controller.getGrammarByLesson);

// [GET] /api/v1/grammars/:grammarId - Lấy chi tiết ngữ pháp theo grammarId
router.get("/:grammarId", controller.getGrammarById);

// [POST] /api/v1/grammars/create - Tạo mới ngữ pháp
router.post("/create", controller.createGrammar);

// [PATCH] /api/v1/grammars/edit/:grammarId - Cập nhật ngữ pháp theo grammarId
router.patch("/edit/:grammarId", controller.updateGrammar);

// [DELETE] /api/v1/grammars/delete/:grammarId - Xóa ngữ pháp theo grammarId
router.delete("/delete/:grammarId", controller.deleteGrammar);

module.exports = router;
