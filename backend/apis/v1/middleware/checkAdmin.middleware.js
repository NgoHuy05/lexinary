const Topic = require("./../models/Topic.models");
module.exports.checkAdminOrOwner = async (req, res, next) => {
  const topicId = req.params.id;
  const userId = req.user.id;

  try {
      const topic = await Topic.findById(topicId);

      if (!topic) {
          return res.status(404).json({ message: "Topic không tồn tại!" });
      }

      // Kiểm tra nếu là admin hoặc chủ sở hữu topic
      if (req.user.role === "admin" || topic.userId.toString() === userId.toString()) {
          return next(); // Cho phép tiếp tục
      } else {
          return res.status(403).json({ message: "Bạn không có quyền xóa topic này!" });
      }
  } catch (err) {
      console.error("Lỗi khi kiểm tra quyền truy cập:", err);
      return res.status(500).json({ message: "Lỗi khi kiểm tra quyền truy cập!" });
  }
};
