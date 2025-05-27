import React, { useState } from "react";
import { Form, Input, Button, Select, message, Card, Upload, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createCourse } from "../../api/apiCourse";

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

function AddCourse() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await createCourse([values]);
      message.success("Tạo khóa học thành công!");
    } catch (error) {
      message.error(
        "Tạo khóa học thất bại: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  // Xử lý upload file JSON
  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const courses = JSON.parse(e.target.result);
        if (!Array.isArray(courses)) {
          message.error("File phải chứa mảng các khóa học JSON");
          return;
        }
        setLoading(true);
        for (const course of courses) {
          await createCourse([course]);
        }
        message.success("Tạo các khóa học thành công!");
      } catch (error) {
        message.error("Đọc file hoặc tạo khóa học thất bại: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsText(file);
    return false; // ngăn upload tự submit
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
        maxWidth: 900,
        margin: "auto",
      }}
    >
      <Card title="Thêm khóa học mới" style={{ flex: 1 }}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            categoryType: "Skill",
            color: "#4ade80",
            icon: "📚",
            status: "pending",
          }}
        >
          <Form.Item
            label="Tiêu đề (title)"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input placeholder="Nhập tiêu đề khóa học" />
          </Form.Item>

          <Form.Item
            label="Loại danh mục (categoryType)"
            name="categoryType"
            rules={[{ required: true, message: "Chọn loại danh mục" }]}
          >
            <Select>
              <Option value="Skill">Skill</Option>
              <Option value="Level">Level</Option>
              <Option value="Purpose">Purpose</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="ID người tạo (createdBy)"
            name="createdBy"
            rules={[{ required: true, message: "Nhập ID người tạo hợp lệ" }]}
          >
            <Input placeholder="Nhập ObjectId của người tạo" />
          </Form.Item>

          <Form.Item label="Mô tả (description)" name="description">
            <TextArea rows={3} placeholder="Mô tả ngắn về khóa học" />
          </Form.Item>

          <Form.Item label="Đối tượng (target)" name="target">
            <TextArea rows={3} placeholder="Khóa học phù hợp với đối tượng nào" />
          </Form.Item>

          <Form.Item label="Nội dung (content)" name="content">
            <TextArea rows={3} placeholder="Nội dung chính của khóa học" />
          </Form.Item>

          <Form.Item label="Màu sắc (color)" name="color">
            <Input type="color" />
          </Form.Item>

          <Form.Item label="Icon" name="icon">
            <Input placeholder="Ví dụ: 📚" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Tạo khóa học
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Phần upload file JSON */}
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Upload
          beforeUpload={handleFileUpload}
          showUploadList={false}
          accept=".json"
          maxCount={1}
          disabled={loading}
        >
          <Button
            type="primary"
            shape="circle"
            icon={<UploadOutlined />}
            size="large"
            loading={loading}
          />
        </Upload>
        <Text style={{ display: "block", marginTop: 8 }}>
          Hoặc upload file JSON khóa học ở đây
        </Text>
      </div>
    </div>
  );
}

export default AddCourse;
