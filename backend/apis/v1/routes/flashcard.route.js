const express = require("express");
const router = express.Router();

const controllers = require("../controllers/flashcard.controller");
const verifyMiddleware = require("../middleware/verifyToken.middleware");


router.get("/", verifyMiddleware.verifyToken, controllers.index);
router.get("/:id", verifyMiddleware.verifyToken, controllers.getFlashcardById);
router.post("/create", verifyMiddleware.verifyToken, controllers.createFlashcard);
router.post("/createMany", verifyMiddleware.verifyToken, controllers.createManyFlashcards);
router.patch("/update/:id", verifyMiddleware.verifyToken, controllers.updateFlashcard);
router.delete("/delete/:id", verifyMiddleware.verifyToken, controllers.deleteFlashcard);
router.get("/topic/:id", verifyMiddleware.verifyToken, controllers.getFlashcardsByTopic);

module.exports = router;
