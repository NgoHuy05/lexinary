const express = require("express");
const router = express.Router();
const controllers = require("../controllers/progress.controller");

// Tạo tiến trình học cho người dùng khi đăng nhập lần đầu
router.post("/create", controllers.createProgress);

// Lấy tiến trình học của người dùng
router.get("/", controllers.getUserProgress);

// Cập nhật tiến trình khi người dùng hoàn thành bài học
router.patch("/update", controllers.updateProgress);

module.exports = router;
