const Flashcard = require("../models/Flashcard.models");
const Topic = require("../models/Topic.models");
// Lấy toàn bộ flashcard của user
module.exports.index = async (req, res) => {
  try {
    const userId = req.user.id;
    const flashcards = await Flashcard.find({ userId }).sort({ createdAt: -1 });
    res.json({ flashcards });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách flashcard" });
  }
};
// Lấy flashcard theo ID
module.exports.getFlashcardById = async (req, res) => {
  try {
    const flashcardId = req.params.id;
    const flashcard = await Flashcard.findById(flashcardId);

    if (!flashcard) {
      return res.status(404).json({ message: "Không tìm thấy flashcard" });
    }

    res.json({ flashcard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi lấy thông tin flashcard" });
  }
};

module.exports.createFlashcard = async (req, res) => {
  try {
    const { term, definition, example, pronunciation, topicId } = req.body;
    const userId = req.user.id;

    // Tạo flashcard mới
    const newFlashcard = new Flashcard({
      term,
      definition,
      example,
      pronunciation,
      topicId,
      userId
    });

    await newFlashcard.save();

    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic không tồn tại!" });
    }

    topic.flashcards.push(newFlashcard._id);
    await topic.save();

    res.status(201).json({ message: "Tạo flashcard thành công", flashcard: newFlashcard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi tạo flashcard" });
  }
};

module.exports.createManyFlashcards = async (req, res) => {
  try {
    const flashcardsData = req.body;

    const topicId = flashcardsData[0].topicId;

    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(400).json({ message: "Topic không tồn tại" });
    }

    const savedflashcards = await Flashcard.insertMany(flashcardsData);

    topic.flashcards.push(...savedflashcards.map(flashcard => flashcard._id));
    await topic.save();
    res.status(201).json({ message: "Tạo flashcard thành công", flashcards: savedflashcards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi tạo flashcard" });
  }
};

// Sửa flashcard
module.exports.updateFlashcard = async (req, res) => {
  try {
    const flashcardId = req.params.id;
    const { term, definition, example, pronunciation, topicId } = req.body;

    const updated = await Flashcard.findByIdAndUpdate(
      flashcardId,
      { term, definition, example, pronunciation, topicId },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Không tìm thấy flashcard" });

    res.json({ message: "Cập nhật thành công", flashcard: updated });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật flashcard" });
  }
};

// Xoá flashcard
module.exports.deleteFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcard.findByIdAndDelete(req.params.id);
    if (!flashcard) return res.status(404).json({ message: "Không tìm thấy flashcard" });
    await Topic.findByIdAndUpdate(flashcard.topicId, {
      $pull: { flashcards: flashcard._id },
    });

    res.json({ message: "Đã xoá flashcard và cập nhật topic" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi xoá flashcard" });
  }
};


module.exports.getFlashcardsByTopic = async (req, res) => {
  try {
    const topicId = req.params.id;
    const currentUserId = req.user.id;
    const currentUserRole = req.user.role;
    const topic = await Topic.findById(topicId);

    if (!topic) {
      return res.status(404).json({ message: "Topic không tồn tại" });
    }

    // Nếu topic public => ai đăng nhập cũng xem được
    if (topic.visibility === "public") {
      const flashcards = await Flashcard.find({ topicId });
      return res.json({ flashcards });
    }

    // Nếu topic private => chỉ admin hoặc chủ sở hữu được xem
    if (topic.userId.toString() !== currentUserId && currentUserRole !== "admin") {
      return res.status(403).json({ message: "Bạn không có quyền truy cập topic này" });
    }

    const flashcards = await Flashcard.find({ topicId });
    return res.json({ flashcards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi lấy flashcard theo topic" });
  }
};