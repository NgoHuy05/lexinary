import React, { useState } from "react";
import { Form, Input, Button, Select, message, Card, Upload, Tooltip, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createTopic } from "../../api/apiTopic";

const { Option } = Select;
const { Text } = Typography;

function AddTopic() {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const topics = JSON.parse(e.target.result);
        if (!Array.isArray(topics)) {
          message.error("File phải chứa mảng các chủ đề JSON");
          return;
        }
        setLoading(true);
        for (const topic of topics) {
          await createTopic(topic);
        }
        message.success("Tạo các chủ đề thành công!");
      } catch (error) {
        message.error("Đọc file hoặc tạo chủ đề thất bại: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsText(file);
    return false; // ngăn Upload tự submit
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
        maxWidth: 800,
        margin: "auto",
      }}
    >
      <Card title="Thêm chủ đề mới" style={{ flex: 1 }}>
        <Form
          layout="vertical"
          onFinish={async (values) => {
            setLoading(true);
            try {
              await createTopic(values);
              message.success("Tạo chủ đề thành công!");
            } catch (error) {
              message.error(
                "Tạo chủ đề thất bại: " +
                  (error.response?.data?.message || error.message)
              );
            } finally {
              setLoading(false);
            }
          }}
          initialValues={{ visibility: "private" }}
        >
          <Form.Item
            label="Tiêu đề chủ đề"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề chủ đề" }]}
          >
            <Input placeholder="Nhập tiêu đề chủ đề" />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea
              rows={4}
              placeholder="Nhập mô tả chủ đề (không bắt buộc)"
            />
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
          Hoặc upload file JSON chủ đề ở đây
        </Text>
      </div>
    </div>
  );
}

export default AddTopic;
