import React, { useEffect, useState } from "react";
import { getNotes, createNote, deleteNote, updateNote } from "../../../api/apiNote";
import { Card, Modal, Input, Button, message, Popconfirm } from "antd";
import "../../../UI/Note.scss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NotePage = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadNotes();
  }, [location.key]);

  // Hàm tải ghi chú
  const loadNotes = async () => {
    try {
      const data = await getNotes();
      if (Array.isArray(data)) {
        setNotes(data);
      } else {
        message.error("Dữ liệu ghi chú không đúng định dạng");
      }
    } catch (error) {
      navigate("/login");
      message.warning("Vui lòng đăng nhập để xem ghi chú");
    }
  };

  // Mở modal để tạo hoặc chỉnh sửa ghi chú
  const handleOpenModal = () => {
    setTitle("");
    setContent("");
    setTasks([]);
    setEditId(null);
    setIsModalOpen(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Xử lý việc tạo hoặc chỉnh sửa ghi chú
  const handleSubmit = async () => {
    try {
      if (editId) {
        // Cập nhật ghi chú
        await updateNote(editId, { title, content, tasks });
      } else {
        // Thêm mới ghi chú
        await createNote({ title, content, tasks });
      }
      setIsModalOpen(false);
      loadNotes();
    } catch (error) {
      message.error("Lỗi khi gửi ghi chú");
    }
  };

  // Chỉnh sửa ghi chú
  const handleEdit = (note) => {
    setEditId(note._id);
    setTitle(note.title);
    setContent(note.content);
    setTasks(note.tasks || []);
    setIsModalOpen(true);
  };

  // Xóa ghi chú
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      loadNotes();
      message.success("Đã xoá ghi chú");
    } catch (error) {
      message.error("Lỗi khi xoá ghi chú");
    }
  };

  // Thay đổi tên nhiệm vụ trong ghi chú
  const handleTaskChange = (index, newTitle) => {
    const updated = [...tasks];
    updated[index].title = newTitle;
    setTasks(updated);
  };

  // Chuyển đổi trạng thái hoàn thành của nhiệm vụ
  const handleTaskToggle = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  // Thêm nhiệm vụ mới
  const handleAddTask = () => {
    setTasks([...tasks, { title: "", completed: false }]);
  };

  // Cập nhật trạng thái task trong ghi chú
  const handleToggleTaskInNote = async (noteId, taskIndex) => {
    const note = notes.find(n => n._id === noteId);
    if (!note) return;

    const updatedTasks = [...note.tasks];
    updatedTasks[taskIndex].completed = !updatedTasks[taskIndex].completed;

    try {
      // Chỉ gửi title, content, và updatedTasks vào request
      await updateNote(noteId, {
        title: note.title,
        content: note.content,
        tasks: updatedTasks
      });
      loadNotes();  // Tải lại danh sách ghi chú
    } catch (error) {
      message.error("Không thể cập nhật task");
    }
  };

  return (
    <div className="note-page">
      <h2 className="note-page__title">📘 Ghi chú</h2>
      <button className="note-page__add-btn" onClick={handleOpenModal}>Tạo mới</button>

      <div className="note-page__list">
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => (
            <div key={note._id} className="note-page__item">
              <Card
                title={note.title || "Ghi chú"}
                extra={note.createdAt ? new Date(note.createdAt).toLocaleDateString("vi-VN") : null}
                className="note-page__card"
              >
                <div className="note-page__content">
                  {note.content.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>  // Mỗi dòng sẽ được hiển thị trong một thẻ <p>
                  ))}
                </div>

                {note.tasks && note.tasks.length > 0 && (
                  <div className="note-page__tasks">
                    {note.tasks.map((task, index) => (
                      <div key={index} className="note-page__task">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleToggleTaskInNote(note._id, index)}
                        />
                        <span className={task.completed ? "completed" : ""}>
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="note-page__actions">
                  <button className="note-page__btn note-page__btn--edit" onClick={() => handleEdit(note)}>✏️ Sửa</button>
                  <Popconfirm
                    title="Bạn có chắc muốn xoá ghi chú này không?"
                    onConfirm={() => handleDelete(note._id)}
                    okText="Xoá"
                    cancelText="Huỷ"
                  >
                    <button className="note-page__btn note-page__btn--delete">🗑️ Xóa</button>
                  </Popconfirm>
                </div>
              </Card>
            </div>
          ))
        ) : (
          <p>Không có ghi chú nào</p>
        )}
      </div>

      <Modal
        title={editId ? "Chỉnh sửa ghi chú" : "Tạo ghi chú mới"}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>Hủy</Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            {editId ? "Cập nhật" : "Thêm mới"}
          </Button>
        ]}
      >
        <Input
          placeholder="Tiêu đề ghi chú..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="note-page__modal-input"
        />
        <textarea
          placeholder="Nội dung ghi chú..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="note-page__modal-textarea"
        ></textarea>

        <div className="note-page__modal-tasks">
          {tasks.map((task, index) => (
            <div key={index} className="note-page__task">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskToggle(index)}
              />
              <Input
                placeholder="Tên nhiệm vụ..."
                value={task.title}
                onChange={(e) => handleTaskChange(index, e.target.value)}
                className="note-page__task-input"
              />
            </div>
          ))}
          <Button onClick={handleAddTask} type="dashed" className="note-page__btn--add-task">
            ➕ Thêm nhiệm vụ
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default NotePage;
