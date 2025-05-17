const express = require("express");
const router = express.Router();
const chapterController = require("../controllers/chapter.controller");

// Routes cho Chapter
router.post("/create", chapterController.createChapter);  // Tạo chương học
router.get("/:courseId", chapterController.getChapters);  // Lấy danh sách chương học theo khóa học
router.get("/:id/detail", chapterController.getChapterDetail);  // Lấy chi tiết chương học
router.get("/get/all", chapterController.getAllChapters);  // Lấy chi tiết chương học
router.patch("/update/:id", chapterController.updateChapter);  // Cập nhật chương học
router.delete("/delete/:id", chapterController.deleteChapter);  // Xóa chương học

module.exports = router;
