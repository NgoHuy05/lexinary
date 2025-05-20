const express = require("express");
const router = express.Router();

const controllers = require("../controllers/user.controller");
const verifyMiddleware = require("../middleware/verifyToken.middleware");
router.post("/register", controllers.registerUser);
router.post("/login", controllers.loginUser);
router.post("/logout", controllers.logoutUser);
router.patch("/update/profile", verifyMiddleware.verifyToken, controllers.updateUserProfile);
router.post("/password-forgot", controllers.forgotPassword);
router.post("/password-otp", controllers.verifyOtp);
router.post("/password-reset", controllers.resetPassword);
router.get("/profile", verifyMiddleware.verifyToken, controllers.getUserProfile);
router.get("/list", controllers.listUser);

router.post("/:userId/marked-complete-lesson/:lessonId", controllers.markLessonCompleted);
router.get("/:userId/completed-lessons", controllers.getCompletedLessons);

module.exports = router;