const express = require("express");
const router = express.Router();

const controllers = require("../controllers/note.controller");
const verifyMiddleware = require("../middleware/verifyToken.middleware");

// [GET] /api/v1/notes/ - Lấy danh sách ghi chú của user (cần token)
router.get("/", verifyMiddleware.verifyToken, controllers.index);

// [POST] /api/v1/notes/create - Tạo ghi chú mới (cần token)
router.post("/create", verifyMiddleware.verifyToken, controllers.createNote);

// [PATCH] /api/v1/notes/update/:id - Cập nhật ghi chú theo id (cần token)
router.patch("/update/:id", verifyMiddleware.verifyToken, controllers.updateNote);

// [DELETE] /api/v1/notes/delete/:id - Xóa ghi chú theo id (cần token)
router.delete("/delete/:id", verifyMiddleware.verifyToken, controllers.deleteNote);

module.exports = router;
