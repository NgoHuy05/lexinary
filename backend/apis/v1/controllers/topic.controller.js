const Topic = require("../models/Topic.models");
const Flashcard = require("../models/Flashcard.models");

// Lấy tất cả topic công khai
module.exports.getPublicTopics = async (req, res) => {
  try {
    // Sửa isPublic thành visibility để phù hợp với schema
    const topics = await Topic.find({ visibility: 'public' }).sort({ createdAt: -1 });
    res.json({ topics });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách topic công khai!" });
  }
};// Lấy 1 topic công khai theo ID
module.exports.getPublicTopicById = async (req, res) => {
  try {
    const topicId = req.params.id;

    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Không tìm thấy topic" });
    }

    if (topic.visibility !== 'public') {
      return res.status(403).json({ message: "Topic này không công khai" });
    }

    res.json({ topic });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi lấy topic công khai" });
  }
};


// Lấy tất cả topic của người dùng (chỉ admin hoặc chính người dùng đó mới xem được)
module.exports.getUserTopics = async (req, res) => {
  try {
    const userId = req.user.id;
    const topics = await Topic.find({ userId }).sort({ createdAt: -1 });
    res.json({ topics });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách topic của người dùng!" });
  }
};
// Lấy 1 topic của người dùng theo ID
module.exports.getUserTopicById = async (req, res) => {
  try {
    const topicId = req.params.id;
    const userId = req.user.id;

    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Không tìm thấy topic" });
    }

    // Chỉ cho phép người tạo xem
    if (String(topic.userId) !== userId) {
      return res.status(403).json({ message: "Bạn không có quyền xem topic này" });
    }

    res.json({ topic });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi lấy topic" });
  }
};
// Lấy tất cả topic (bao gồm public và private) - chỉ admin được gọi
module.exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find().sort({ createdAt: -1 });
    res.json({ topics });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi lấy tất cả topic" });
  }
};

// Tạo topic mới
module.exports.createTopic = async (req, res) => {
  try {
    const { title, description } = req.body; // Lấy dữ liệu từ body
    const userId = req.user.id;
    let newVisibility;
    if (req.user.role === 'admin') {
      newVisibility = 'public'; // Nếu là admin, topic mặc định sẽ là public
    } else if (!newVisibility) {
      newVisibility = 'private'; // Nếu không có visibility, gán là private
    }


    const newTopic = new Topic({
      title,
      description,
      userId,
      visibility: newVisibility, // Gán giá trị visibility vào topic
    });

    await newTopic.save();
    res.status(201).json({ message: "Tạo topic thành công", topic: newTopic });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi tạo topic" });
  }
};

// Tạo nhiều topic cùng lúc
module.exports.createManyTopics = async (req, res) => {
  try {
    const topicsData = req.body; // Mảng các topic từ request body
    const userId = req.user.id;

    // Kiểm tra xem mảng topics có được gửi hay không
    if (!topicsData || topicsData.length === 0) {
      return res.status(400).json({ message: "Không có topic để tạo" });
    }

    // Kiểm tra mỗi topic có trường title
    for (const topic of topicsData) {
      if (!topic.title) {
        return res.status(400).json({ message: "Mỗi topic cần có tiêu đề (title)" });
      }
    }

    // Tạo một mảng các topic mới
    const newTopics = topicsData.map(topic => {
      let newVisibility = topic.visibility || 'private'; // Mặc định là private nếu không có visibility

      if (req.user.role === 'admin') {
        newVisibility = 'public'; // Admin sẽ tạo topic public
      }

      return {
        title: topic.title,
        description: topic.description,
        userId,
        visibility: newVisibility,
      };
    });

    // Lưu tất cả các topic vào cơ sở dữ liệu
    const createdTopics = await Topic.insertMany(newTopics);

    // Trả về kết quả
    res.status(201).json({ message: "Tạo các topic thành công", topics: createdTopics });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi tạo các topic" });
  }
};

// Sửa topic
module.exports.updateTopic = async (req, res) => {
  const { title, description, flashcards } = req.body; // Không nhận visibility từ request
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: 'Topic không tồn tại!' });
    }

    // Cập nhật thông tin topic, nhưng không cho phép chỉnh sửa trường visibility
    topic.title = title || topic.title;
    topic.description = description || topic.description;

    // Chỉ cập nhật flashcards nếu có
    if (flashcards && flashcards.length > 0) {
      for (let fc of flashcards) {
        await Flashcard.findByIdAndUpdate(fc._id, {
          term: fc.term,
          definition: fc.definition,
          example: fc.example,
          pronunciation: fc.pronunciation,
        });
      }
    }

    // Lưu lại topic đã cập nhật
    await topic.save();

    res.json({ message: 'Cập nhật topic và flashcards thành công!', topic });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi khi cập nhật topic hoặc flashcards!' });
  }
};


// Xoá topic và toàn bộ flashcard liên quan
module.exports.deleteTopic = async (req, res) => {
  try {
    const topicId = req.params.id;
    const userId = req.user.id;

    // Tìm topic theo ID
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic không tồn tại" });
    }

    // Kiểm tra quyền:
    // - Admin có thể xoá tất cả
    // - Người dùng chỉ được xoá topic của chính họ
    if (req.user.role !== 'admin' && String(topic.userId) !== userId) {
      return res.status(403).json({ message: "Bạn không có quyền xóa topic này" });
    }

    // Xoá topic và tất cả flashcard liên quan
    await Topic.findByIdAndDelete(topicId);
    await Flashcard.deleteMany({ topicId });

    res.json({ message: "Đã xoá topic và các flashcard liên quan" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi xoá topic" });
  }
};

// Lấy topic kèm flashcards (dùng khi chỉnh sửa)
module.exports.getTopicWithFlashcards = async (req, res) => {
  try {
    const topicId = req.params.id;
    const userId = req.user.id;

    // Lấy topic kèm theo các flashcards
    const topic = await Topic.findById(topicId)
      .populate('flashcards');  // Populating flashcards liên kết với topic

    if (!topic) {
      return res.status(404).json({ message: "Không tìm thấy topic" });
    }

    // Kiểm tra quyền truy cập: chỉ người tạo mới được chỉnh sửa
    if (String(topic.userId) !== userId) {
      return res.status(403).json({ message: "Bạn không có quyền truy cập topic này" });
    }

    res.json(topic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi lấy topic và flashcards" });
  }
};
