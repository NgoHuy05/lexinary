const express = require("express");
const router = express.Router();

const controllers = require("../controllers/flashcard.controller");
const verifyMiddleware = require("../middleware/verifyToken.middleware");

// [GET] /api/v1/flashcards/topic/:id - Lấy danh sách flashcard theo topicId
router.get("/topic/:id", verifyMiddleware.verifyToken, controllers.getFlashcardsByTopic);

// [GET] /api/v1/flashcards/ - Lấy tất cả flashcards (có thể dùng cho admin hoặc tổng quan)
router.get("/", verifyMiddleware.verifyToken, controllers.index);

// [GET] /api/v1/flashcards/:id - Lấy chi tiết flashcard theo ID
router.get("/:id", verifyMiddleware.verifyToken, controllers.getFlashcardById);

// [POST] /api/v1/flashcards/create - Tạo mới 1 flashcard
router.post("/create", verifyMiddleware.verifyToken, controllers.createFlashcard);

// [POST] /api/v1/flashcards/createMany - Tạo nhiều flashcards cùng lúc
router.post("/createMany", verifyMiddleware.verifyToken, controllers.createManyFlashcards);

// [PATCH] /api/v1/flashcards/update/:id - Cập nhật 1 flashcard theo ID
router.patch("/update/:id", verifyMiddleware.verifyToken, controllers.updateFlashcard);

// [DELETE] /api/v1/flashcards/delete/:id - Xóa flashcard theo ID
router.delete("/delete/:id", verifyMiddleware.verifyToken, controllers.deleteFlashcard);

module.exports = router;
