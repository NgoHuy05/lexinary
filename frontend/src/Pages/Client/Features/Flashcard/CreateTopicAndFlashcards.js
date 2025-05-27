import React, { useState } from "react";
import { Layout, Form, Input, Button, Divider, message, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { createTopic } from "../../../../api/apiTopic";
import { createFlashcard } from "../../../../api/apiFlashcard";
import "../../../../UI/CreateTopicAndFlashcards.scss";
import { DeleteOutlined } from "@ant-design/icons";

const { Content } = Layout;

const CreateTopicAndFlashcards = () => {
  const [topicTitle, setTopicTitle] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [flashcards, setFlashcards] = useState(
    Array(1).fill({ term: "", definition: "", example: "", pronunciation: "" })
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFlashcardChange = (index, field, value) => {
    const updated = [...flashcards];
    updated[index] = { ...updated[index], [field]: value };
    setFlashcards(updated);
  };

  const handleAddFlashcard = () => {
    setFlashcards([...flashcards, { term: "", definition: "", example: "", pronunciation: "" }]);
  };

  const handleDeleteFlashcard = (index) => {
    const updated = [...flashcards];
    updated.splice(index, 1);
    setFlashcards(updated);
  };
  const handleSubmitAll = async () => {
    if (!topicTitle || !topicDescription) {
      message.warning("Vui lòng nhập tiêu đề và mô tả chủ đề!");
      return;
    }

    const hasInvalidFlashcard = flashcards.some(
      (fc) => !fc.term || !fc.definition
    );
    if (hasInvalidFlashcard) {
      message.warning("Tất cả flashcard đều phải có Thuật ngữ và Định nghĩa!");
      return;
    }

    setLoading(true);
    try {
      const topicRes = await createTopic(topicTitle, topicDescription);
      if (topicRes && topicRes.message === "Tạo topic thành công") {
        const topicId = topicRes.topic._id;
        let flashcardSuccess = true;
        for (let fc of flashcards) {
          try {
            const flashcardRes = await createFlashcard(
              fc.term,
              fc.definition,
              fc.example,
              fc.pronunciation,
              topicId
            );
            if (
              !flashcardRes ||
              flashcardRes.message !== "Tạo flashcard thành công"
            ) {
              flashcardSuccess = false;
              break;
            }
          } catch (flashcardError) {
            flashcardSuccess = false;
            console.error("Lỗi khi tạo flashcard:", flashcardError);
            break;
          }
        }

        if (flashcardSuccess) {
          message.success("Tạo chủ đề và flashcards thành công!");
          navigate("/flashcard/home");
        } else {
          message.error("Tạo flashcards thất bại!");
        }
      } else {
        message.error("Tạo chủ đề thất bại: " + topicRes.message);
      }
    } catch (err) {
      message.error("Lỗi khi tạo chủ đề hoặc flashcard!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="create-topic__title--main">Tạo một học phần mới cho riêng bạn</h1>
      <Layout className="create-topic">
        <Content className="create-topic__content">
          <Form layout="vertical">
            <Form.Item label="Tiêu đề học phần">
              <Input
                value={topicTitle}
                onChange={(e) => setTopicTitle(e.target.value)}
                placeholder="Nhập tiêu đề học phần"
              />
            </Form.Item>
            <Form.Item label="Mô tả">
              <Input.TextArea
                value={topicDescription}
                onChange={(e) => setTopicDescription(e.target.value)}
                placeholder="Nhập mô tả học phần"
              />
            </Form.Item>
          </Form>

          <Divider orientation="left">Danh sách Flashcard</Divider>

          {flashcards.map((card, index) => (
            <Form
              layout="vertical"
              key={index}
              className="create-topic__flashcard"
            >
              <h3 className="create-topic__title">Flashcard {index + 1}</h3>
              <Button
                className="create-topic__delete-flashcard"
                type="danger"
                onClick={() => handleDeleteFlashcard(index)}
                style={{ marginBottom: "10px" }}
              >
                <DeleteOutlined />
              </Button>

              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item label="Thuật ngữ">
                    <Input
                      value={card.term}
                      onChange={(e) => handleFlashcardChange(index, "term", e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Định nghĩa">
                    <Input
                      value={card.definition}
                      onChange={(e) => handleFlashcardChange(index, "definition", e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item label="Ví dụ">
                    <Input
                      value={card.example}
                      onChange={(e) => handleFlashcardChange(index, "example", e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Phát âm">
                    <Input
                      value={card.pronunciation}
                      onChange={(e) => handleFlashcardChange(index, "pronunciation", e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              {index < flashcards.length - 1 && <Divider />}
            </Form>
          ))}
          <Button
            type="dashed"
            onClick={handleAddFlashcard}
            block
            className="create-topic__add-flashcard"
          >
            Thêm Flashcard
          </Button>

          <Button
            type="primary"
            loading={loading}
            onClick={handleSubmitAll}
            block
            className="create-topic__submit"
          >
            Tạo Chủ Đề & Flashcards
          </Button>
        </Content>
      </Layout>
    </>
  );
};

export default CreateTopicAndFlashcards;
