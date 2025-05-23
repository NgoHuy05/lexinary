const express = require("express");
const router = express.Router();

const controllers = require("../controllers/course.controller");

router.get("/", controllers.index);                        // Lấy danh sách khóa học
router.get("/detail/:id", controllers.getCourseDetail);    // Lấy chi tiết khóa học theo ID
router.patch("/change-status/:id", controllers.changeStatus);  // Thay đổi trạng thái khóa học
router.patch("/change-multi", controllers.changeMulti);    // Thay đổi trạng thái của nhiều khóa học
router.post("/create", controllers.createCourses);          // Tạo khóa học mới
router.patch("/update/:id", controllers.updateCourse);         // Chỉnh sửa khóa học
router.delete("/delete/:id", controllers.deleteCourse);   // Xóa khóa học

router.get("/stats", controllers.getAdminStats);                        // Lấy danh sách khóa học

module.exports = router;
