const express = require("express");
const router = express.Router();

const controllers = require("../controllers/topic.controller");
const verifyMiddleware = require("../middleware/verifyToken.middleware");
const checkAdminMiddleware = require("../middleware/checkAdmin.middleware");

// [GET] /api/v1/topics/public
// Lấy tất cả topic công khai
router.get("/public", controllers.getPublicTopics);

// [GET] /api/v1/topics/public/:id
// Lấy topic công khai theo ID (yêu cầu token)
router.get("/public/:id", verifyMiddleware.verifyToken, controllers.getPublicTopicById);

// [GET] /api/v1/topics/all
// Lấy tất cả topic (cần xác thực)
router.get("/all", verifyMiddleware.verifyToken, controllers.getAllTopics);

// [GET] /api/v1/topics/user
// Lấy tất cả topic của người dùng hiện tại (cần xác thực)
router.get("/user", verifyMiddleware.verifyToken, controllers.getUserTopics);

// [GET] /api/v1/topics/user/:id
// Lấy topic của user theo ID (cần xác thực)
router.get("/user/:id", verifyMiddleware.verifyToken, controllers.getUserTopicById);

// [POST] /api/v1/topics/create
// Tạo mới topic (cần xác thực)
router.post("/create", verifyMiddleware.verifyToken, controllers.createTopic);

// [POST] /api/v1/topics/createMany
// Tạo nhiều topic cùng lúc (cần xác thực)
router.post("/createMany", verifyMiddleware.verifyToken, controllers.createManyTopics);

// [PATCH] /api/v1/topics/update/:id
// Cập nhật topic theo ID (cần xác thực)
router.patch("/update/:id", verifyMiddleware.verifyToken, controllers.updateTopic);

// [DELETE] /api/v1/topics/delete/:id
// Xóa topic theo ID
// Chỉ admin hoặc chủ sở hữu topic mới được xóa
router.delete("/delete/:id", verifyMiddleware.verifyToken, checkAdminMiddleware.checkAdminOrOwner, controllers.deleteTopic);

// [GET] /api/v1/topics/:id
// Lấy topic theo ID kèm flashcards (dùng cho trang chỉnh sửa)
router.get("/:id", verifyMiddleware.verifyToken, controllers.getTopicWithFlashcards);

module.exports = router;
