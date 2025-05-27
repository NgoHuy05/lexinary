const express = require("express");
const router = express.Router();
const chapterController = require("../controllers/chapter.controller");

// [POST] /api/v1/chapters/create - Tạo chương học
router.post("/create", chapterController.createChapter);

// [GET] /api/v1/chapters/:courseId - Lấy danh sách chương học theo courseId
router.get("/:courseId", chapterController.getChapters);

// [GET] /api/v1/chapters/:id/detail - Lấy chi tiết một chương học theo id
router.get("/:id/detail", chapterController.getChapterDetail);

// [GET] /api/v1/chapters/get/all - Lấy tất cả chương học (dành cho admin)
router.get("/get/all", chapterController.getAllChapters);

// [PATCH] /api/v1/chapters/update/:id - Cập nhật chương học theo id
router.patch("/update/:id", chapterController.updateChapter);

// [DELETE] /api/v1/chapters/delete/:id - Xóa chương học theo id
router.delete("/delete/:id", chapterController.deleteChapter);

module.exports = router;
