const express = require("express");
const router = express.Router();
const controllers = require("../controllers/course.controller");

// [GET] /api/v1/courses/ - Lấy danh sách tất cả khóa học
router.get("/", controllers.index);

// [GET] /api/v1/courses/detail/:id - Lấy chi tiết khóa học theo ID
router.get("/detail/:id", controllers.getCourseDetail);

// [PATCH] /api/v1/courses/change-multi - Thay đổi nhiều khóa học cùng lúc (status, deleted...)
router.patch("/change-multi", controllers.changeMulti);

// [POST] /api/v1/courses/create - Tạo khóa học mới
router.post("/create", controllers.createCourses);

// [PATCH] /api/v1/courses/update/:id - Cập nhật thông tin khóa học theo ID
router.patch("/update/:id", controllers.updateCourse);

// [DELETE] /api/v1/courses/delete/:id - Xóa khóa học theo ID
router.delete("/delete/:id", controllers.deleteCourse);

// [GET] /api/v1/courses/stats - Lấy thống kê khóa học cho admin (số lượng, người học, vv.)
router.get("/stats", controllers.getAdminStats);

module.exports = router;
