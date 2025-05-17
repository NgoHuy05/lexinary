const Note = require("../models/Note.model");

// Lấy tất cả ghi chú của người dùng, bao gồm cả tasks
module.exports.index = async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await Note.find({ userId }).sort({ createdAt: -1 });
    res.json({ notes });  // Đảm bảo backend trả về { notes: [...] }
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách ghi chú" });
  }
};
module.exports.createNote = async (req, res) => {
  try {
    const { title, content, tasks } = req.body;  // Lấy title, content, tasks từ request body
    const userId = req.user.id;  // Lấy userId từ token

    // Kiểm tra xem có ít nhất một trong hai trường content hoặc tasks không rỗng
    if ((content.trim() === "" && (!tasks || tasks.length === 0))) {
      return res.status(400).json({ message: "Cần ít nhất một trong hai: content hoặc tasks." });
    }

    const newNote = new Note({
      title,
      content: content || "",  // Nếu không có content thì mặc định là chuỗi rỗng
      tasks: tasks || [],  // Nếu không có tasks thì mặc định là mảng rỗng
      userId
    });

    await newNote.save();

    res.status(201).json({ message: "Tạo ghi chú thành công", note: newNote });
  } catch (err) {
    console.error("Lỗi khi tạo ghi chú:", err);
    res.status(500).json({ message: "Lỗi khi tạo ghi chú" });
  }
};


module.exports.updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    const { title, content, tasks } = req.body;  // Chỉ lấy tasks từ request body

    // Cập nhật ghi chú chỉ với tasks
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      {  title, content, tasks }, 
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Không tìm thấy ghi chú" });
    }

    res.json({ message: "Cập nhật thành công", note: updatedNote });
  } catch (err) {
    console.error("Lỗi khi cập nhật ghi chú:", err);
    res.status(500).json({ message: "Lỗi khi cập nhật ghi chú" });
  }
};


// Xóa ghi chú
module.exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    const deleted = await Note.findByIdAndDelete(noteId);

    if (!deleted) return res.status(404).json({ message: "Không tìm thấy ghi chú" });

    res.json({ message: "Xóa ghi chú thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa ghi chú" });
  }
};
