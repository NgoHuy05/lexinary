import React, { useEffect, useState } from "react";
import {
  Layout,
  Form,
  Input,
  Button,
  Divider,
  message,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { getUserTopics, updateTopic } from "../../../../api/apiTopic";
import { deleteFlashcard, editFlashcard, createFlashcard, getFlashcards } from "../../../../api/apiFlashcard";

const { Content } = Layout;

const EditTopic = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletedFlashcardIds, setDeletedFlashcardIds] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await getUserTopics(); // Fetch all topics of the user
        const topic = res.find((t) => t._id === id); // Find the topic by ID
        form.setFieldsValue({
          title: topic.title,
          description: topic.description,
        });

        // Kiểm tra lại flashcards trước khi gán vào state
        const flashcardIds = topic.flashcards; // Mảng các ID của flashcards
        const flashcardsDetails = [];

        for (let flashcardId of flashcardIds) {
          const flashcardRes = await getFlashcards(flashcardId);
          if (flashcardRes && flashcardRes.flashcard) {
            flashcardsDetails.push(flashcardRes.flashcard);
          }

        }
        setFlashcards(flashcardsDetails); // Gán vào state flashcards

      } catch (err) {
        message.error("Lỗi khi tải topic");
      }
    };

    fetchTopic();
  }, [id, form]);

  // Handle changes in flashcard fields
  const handleFlashcardChange = (index, field, value) => {
    const updated = [...flashcards];
    updated[index] = { ...updated[index], [field]: value };
    setFlashcards(updated);
  };

  // Handle deleting a flashcard
  const handleDeleteFlashcard = (index) => {
    const updated = [...flashcards];
    const removed = updated.splice(index, 1)[0];
    setFlashcards(updated);
    if (removed._id) {
      setDeletedFlashcardIds([...deletedFlashcardIds, removed._id]);
    }
  };

  // Handle adding a new flashcard
  const handleAddFlashcard = () => {
    setFlashcards([
      ...flashcards,
      { term: "", definition: "", example: "", pronunciation: "" },
    ]);
  };

  // Handle submit all data (topic and flashcards)
  const handleSubmitAll = async () => {
    const values = form.getFieldsValue();
    if (!values.title || !values.description) {
      return message.warning("Vui lòng nhập tiêu đề và mô tả chủ đề!");
    }

    // Validate flashcards (at least one term and definition)
    const validFlashcards = flashcards.filter(
      (fc) => fc.term && fc.definition
    );

    if (validFlashcards.length === 0) {
      return message.warning("Cần ít nhất một flashcard hợp lệ!");
    }

    // Lấy topicId từ form để sử dụng khi tạo flashcard
    const topicId = id;

    setLoading(true);
    try {
      // Update the topic first
      const updatedTopic = await updateTopic(id, values, validFlashcards);
      if (!updatedTopic) {
        return message.error("Lỗi khi cập nhật topic!");
      }

      // Update or create each flashcard (edit existing and create new)
      for (let fc of validFlashcards) {
        if (fc._id) {
          // Update existing flashcard
          await editFlashcard(
            fc._id,
            fc.term,
            fc.definition,
            fc.example,
            fc.pronunciation
          );
        } else {
          // Create new flashcard with topicId
          await createFlashcard(
            fc.term,
            fc.definition,
            fc.example,
            fc.pronunciation,
            topicId 
          );
        }
      }

      for (let flashcardId of deletedFlashcardIds) {
        await deleteFlashcard(flashcardId);
      }

      message.success("Cập nhật topic và flashcard thành công!");
      navigate("/flashcard/library"); // Navigate to topic library after successful update
    } catch (err) {
      message.error("Lỗi khi cập nhật topic hoặc flashcard!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="create-topic__title--main">Chỉnh sửa học phần</h1>
      <Layout className="create-topic">
        <Content className="create-topic__content">
          <Form layout="vertical" form={form}>
            <Form.Item label="Tên topic" name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
              <Input.TextArea />
            </Form.Item>
          </Form>

          <Divider orientation="left">Danh sách Flashcard</Divider>

          {/* Lặp qua mảng flashcards để render form cho từng flashcard */}
          {flashcards.map((flashcard, index) => (
            <div key={index}>
              <h3>Flashcard {index + 1}</h3>
              <Form layout="vertical">
                <Form.Item label="Term" required>
                  <Input
                    value={flashcard.term}
                    onChange={(e) => handleFlashcardChange(index, "term", e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Definition" required>
                  <Input
                    value={flashcard.definition}
                    onChange={(e) => handleFlashcardChange(index, "definition", e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Example">
                  <Input
                    value={flashcard.example}
                    onChange={(e) => handleFlashcardChange(index, "example", e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Pronunciation">
                  <Input
                    value={flashcard.pronunciation}
                    onChange={(e) => handleFlashcardChange(index, "pronunciation", e.target.value)}
                  />
                </Form.Item>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteFlashcard(index)}
                >
                  Xóa Flashcard
                </Button>
              </Form>
              <Divider />
            </div>
          ))}

          <Button type="dashed" onClick={handleAddFlashcard} block>
            Thêm Flashcard
          </Button>

          <Button
            type="primary"
            loading={loading}
            onClick={handleSubmitAll}
            block
            style={{ marginTop: 20 }}
          >
            Lưu thay đổi
          </Button>
        </Content>
      </Layout>
    </>
  );
};

export default EditTopic;


