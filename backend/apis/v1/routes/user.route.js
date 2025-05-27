const express = require("express");
const router = express.Router();

const controllers = require("../controllers/user.controller");
const verifyMiddleware = require("../middleware/verifyToken.middleware");

// [POST] /api/v1/users/register - Đăng ký người dùng mới
router.post("/register", controllers.registerUser);

// [POST] /api/v1/users/login - Đăng nhập
router.post("/login", controllers.loginUser);

// [POST] /api/v1/users/logout - Đăng xuất
router.post("/logout", controllers.logoutUser);

// [PATCH] /api/v1/users/update/profile - Cập nhật thông tin profile (cần token)
router.patch("/update/profile", verifyMiddleware.verifyToken, controllers.updateUserProfile);

// [POST] /api/v1/users/password-forgot - Yêu cầu quên mật khẩu (gửi OTP)
router.post("/password-forgot", controllers.forgotPassword);

// [POST] /api/v1/users/password-otp - Xác thực OTP
router.post("/password-otp", controllers.verifyOtp);

// [POST] /api/v1/users/password-reset - Đặt lại mật khẩu
router.post("/password-reset", controllers.resetPassword);

// [GET] /api/v1/users/profile - Lấy thông tin profile người dùng (cần token)
router.get("/profile", verifyMiddleware.verifyToken, controllers.getUserProfile);

// [GET] /api/v1/users/list - Lấy danh sách người dùng
router.get("/list", controllers.listUser);

// [POST] /api/v1/users/:userId/marked-complete-lesson/:lessonId
// Đánh dấu bài học đã hoàn thành cho user
router.post("/:userId/marked-complete-lesson/:lessonId", controllers.markLessonCompleted);

// [GET] /api/v1/users/:userId/completed-lessons
// Lấy danh sách bài học đã hoàn thành của user
router.get("/:userId/completed-lessons", controllers.getCompletedLessons);

// [PATCH] /api/v1/users/update/:id - Cập nhật thông tin user theo ID
router.patch("/update/:id", controllers.updateUserById);

// [DELETE] /api/v1/users/delete/:id - Xóa user theo ID
router.delete("/delete/:id", controllers.deleteUserById);

module.exports = router;
