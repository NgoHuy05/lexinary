import React, { useState } from "react";
import { Form, Input, Button, Select, message, Card } from "antd";
import { createTopic } from "../../api/apiTopic";

const { Option } = Select;

function AddTopic() {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      await createTopic(values);
      message.success("Tạo chủ đề thành công!");
    } catch (error) {
      message.error(
        "Tạo chủ đề thất bại: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Thêm chủ đề mới" style={{ maxWidth: 600, margin: "auto" }}>
      <Form layout="vertical" onFinish={onFinish} initialValues={{ visibility: "private" }}>
        <Form.Item
          label="Tiêu đề chủ đề"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề chủ đề" }]}
        >
          <Input placeholder="Nhập tiêu đề chủ đề" />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={4} placeholder="Nhập mô tả chủ đề (không bắt buộc)" />
        </Form.Item>

        <Form.Item
          label="Chế độ hiển thị"
          name="visibility"
          rules={[{ required: true, message: "Vui lòng chọn chế độ hiển thị" }]}
        >
          <Select>
            <Option value="public">Công khai</Option>
            <Option value="private">Riêng tư</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Tạo chủ đề
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default AddTopic;
