const express = require("express");
const router = express.Router();
const controllers = require("../controllers/progress.controller");

// [POST] /api/v1/progress/create
// Tạo tiến trình học cho người dùng khi đăng nhập lần đầu
router.post("/create", controllers.createProgress);

// [GET] /api/v1/progress/
// Lấy tiến trình học của người dùng
router.get("/", controllers.getUserProgress);

// [PATCH] /api/v1/progress/update
// Cập nhật tiến trình khi người dùng hoàn thành bài học
router.patch("/update", controllers.updateProgress);

module.exports = router;
