const express = require("express");
const router = express.Router();

const controllers = require("../controllers/topic.controller");
const verifyMiddleware = require("../middleware/verifyToken.middleware");
const checkAdminMiddleware = require("../middleware/checkAdmin.middleware");

// Lấy tất cả topic công khai
router.get("/public", verifyMiddleware.verifyToken, controllers.getPublicTopics);
router.get("/public/:id", verifyMiddleware.verifyToken, controllers.getPublicTopicById);

router.get("/all", verifyMiddleware.verifyToken, controllers.getAllTopics);

// Lấy tất cả topic của người dùng (chỉ admin hoặc chính người dùng đó mới xem được)
router.get("/user", verifyMiddleware.verifyToken, controllers.getUserTopics);
router.get("/user/:id", verifyMiddleware.verifyToken, controllers.getUserTopicById);

// Tạo topic mới
router.post("/create", verifyMiddleware.verifyToken, controllers.createTopic);
router.post("/createMany", verifyMiddleware.verifyToken, controllers.createManyTopics);

// Sửa topic
router.patch("/update/:id", verifyMiddleware.verifyToken, controllers.updateTopic);

// Xoá topic (chỉ admin mới có thể xoá tất cả, người dùng chỉ có thể xoá topic của chính mình)
router.delete("/delete/:id", verifyMiddleware.verifyToken, checkAdminMiddleware.checkAdminOrOwner, controllers.deleteTopic);
// Lấy topic theo ID kèm flashcards (dùng cho Edit)
router.get("/:id", verifyMiddleware.verifyToken, controllers.getTopicWithFlashcards);

module.exports = router;
