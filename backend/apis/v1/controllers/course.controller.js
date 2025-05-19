const mongoose = require("mongoose");
const Course = require("../models/Course.models");

// Lấy danh sách khóa học với phân trang và tìm kiếm
module.exports.index = async (req, res) => {
    try {
        const find = { deleted: false };

        if (req.query.categoryType) {
            find.categoryType = req.query.categoryType;
        }

        const courses = await Course.find(find);
        res.json(courses);
    } catch (error) {
        console.error("Lỗi lấy dữ liệu khóa học:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Lấy thông tin chi tiết khóa học
module.exports.getCourseDetail = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await Course.findOne({ _id: id, deleted: false })
            .populate("lessons")
            .populate("chapters")
            .populate("listUser")
            .populate("createdBy");

        if (!course) {
            return res.status(404).json({ message: "Không tìm thấy khóa học" });
        }

        res.json(course);
    } catch (error) {
        console.error("Lỗi lấy dữ liệu khóa học:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Tạo khóa học mới
module.exports.createCourses = async (req, res) => {
    try {
        const courses = req.body;

        if (!Array.isArray(courses)) {
            return res.status(400).json({ message: "Dữ liệu phải là một mảng" });
        }

        for (let course of courses) {
            const { title, categoryType, createdBy, target, content, audience } = course;

            if (!title || !categoryType || !createdBy) {
                return res.status(400).json({ message: "Mỗi khóa học cần có đầy đủ title, categoryType và createdBy" });
            }

            if (!["Skill", "Level", "Purpose"].includes(categoryType)) {
                return res.status(400).json({ message: `Loại danh mục '${categoryType}' không hợp lệ` });
            }

            if (!mongoose.Types.ObjectId.isValid(createdBy)) {
                return res.status(400).json({ message: `createdBy với id '${createdBy}' không hợp lệ` });
            }

            if (target && typeof target !== 'string') {
                return res.status(400).json({ message: "Trường 'target' phải là một chuỗi" });
            }
            if (content && typeof content !== 'string') {
                return res.status(400).json({ message: "Trường 'content' phải là một chuỗi" });
            }
            if (audience && typeof audience !== 'string') {
                return res.status(400).json({ message: "Trường 'audience' phải là một chuỗi" });
            }

            course.chapters = course.chapters || [];
            course.lessons = course.lessons || [];
            course.listUser = course.listUser || [];
            course.color = course.color || "#FFFFFF";
            course.icon = course.icon || "default-icon.png";
        }

        const savedCourses = await Course.insertMany(courses.map(course => ({
            title: course.title,
            description: course.description,
            categoryType: course.categoryType,
            color: course.color,
            icon: course.icon,
            chapters: course.chapters,
            lessons: course.lessons,
            listUser: course.listUser,
            createdBy: new mongoose.Types.ObjectId(course.createdBy),
            status: course.status || "pending",
            target: course.target,
            content: course.content,
            audience: course.audience,
        })));

        res.status(201).json({
            message: 'Courses created successfully',
            courses: savedCourses,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creating courses',
            error: error.message,
        });
    }
};

// Chỉnh sửa thông tin khóa học
module.exports.updateCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, categoryType, color, icon, target, content, audience, lessons } = req.body;

        const updatedData = {};
        if (title) updatedData.title = title;
        if (description) updatedData.description = description;
        if (categoryType) updatedData.categoryType = categoryType;
        if (color) updatedData.color = color;
        if (icon) updatedData.icon = icon;
        if (target) updatedData.target = target;
        if (content) updatedData.content = content;
        if (audience) updatedData.audience = audience;
        if (lessons) updatedData.lessons = lessons;

        const updatedCourse = await Course.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ message: "Không tìm thấy khóa học để chỉnh sửa" });
        }

        res.json({
            code: 200,
            message: "Cập nhật khóa học thành công",
            course: updatedCourse
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Lỗi server khi chỉnh sửa khóa học",
            error: error.message
        });
    }
};

// Xóa khóa học
module.exports.deleteCourse = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedCourse = await Course.findByIdAndUpdate(id, { deleted: true, deletedAt: new Date() }, { new: true });

        if (!deletedCourse) {
            return res.status(404).json({ message: "Không tìm thấy khóa học để xóa" });
        }

        res.json({
            code: 200,
            message: "Xóa khóa học thành công",
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Lỗi server khi xóa khóa học",
            error: error.message
        });
    }
};

// Thay đổi trạng thái của nhiều khóa học
module.exports.changeStatus = async (req, res) => {
    try {
        const { ids, status } = req.body;

        const updatedCourses = await Course.updateMany({ _id: { $in: ids } }, { status });

        res.json({
            code: 200,
            message: "Cập nhật trạng thái thành công",
            updatedCourses
        });
    } catch (error) {
        console.error("Lỗi thay đổi trạng thái:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Thay đổi nhiều khóa học cùng lúc
module.exports.changeMulti = async (req, res) => {
    try {
        const { ids, key, value } = req.body;

        let updateData = {};
        switch (key) {
            case "status":
                updateData.status = value;
                break;
            case "delete":
                updateData.deleted = true;
                updateData.deletedAt = new Date();
                break;
            default:
                return res.status(400).json({ message: "Thay đổi thất bại: Không hợp lệ" });
        }

        await Course.updateMany({ _id: { $in: ids } }, updateData);

        res.json({
            code: 200,
            message: `${key} của các khóa học đã được cập nhật thành công`,
        });
    } catch (error) {
        console.error("Lỗi khi thay đổi nhiều khóa học:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};
