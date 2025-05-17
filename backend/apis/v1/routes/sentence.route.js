const express = require("express");
const router = express.Router();
const sentenceController = require("../controllers/sentence.controller");

router.get("/", sentenceController.getAllSentences);
router.get("/lesson/:lessonId", sentenceController.getSentenceByLesson);
router.get("/:sentenceId", sentenceController.getSentenceById);
router.post("/create", sentenceController.createSentence);
router.patch("/update/:sentenceId", sentenceController.updateSentence);
router.delete("/delete/:sentenceId", sentenceController.deleteSentence);

module.exports = router;
