const express = require("express");
const router = express.Router();

const controllers = require("../controllers/flashcard.controller");
const verifyMiddleware = require("../middleware/verifyToken.middleware");

// Route cụ thể cần đặt trước
router.get("/topic/:id", verifyMiddleware.verifyToken, controllers.getFlashcardsByTopic);

router.get("/", verifyMiddleware.verifyToken, controllers.index);
router.get("/:id", verifyMiddleware.verifyToken, controllers.getFlashcardById);
router.post("/create", verifyMiddleware.verifyToken, controllers.createFlashcard);
router.post("/createMany", verifyMiddleware.verifyToken, controllers.createManyFlashcards);
router.patch("/update/:id", verifyMiddleware.verifyToken, controllers.updateFlashcard);
router.delete("/delete/:id", verifyMiddleware.verifyToken, controllers.deleteFlashcard);

module.exports = router;
