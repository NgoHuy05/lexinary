import React, { useState } from "react";
import { Form, Input, Button, Select, message, Card } from "antd";
import { createCourse } from "../../api/apiCourse";

const { TextArea } = Input;
const { Option } = Select;

function AddCourse() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await createCourse([values]);
      message.success("Tạo khóa học thành công!");
    } catch (error) {
      message.error("Tạo khóa học thất bại: " + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Thêm khóa học mới" style={{ maxWidth: 700, margin: "auto" }}>
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
  );
}

export default AddCourse;
