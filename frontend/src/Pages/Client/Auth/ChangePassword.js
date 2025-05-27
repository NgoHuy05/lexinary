import React from "react";
import { Form, Input, Button, notification } from "antd";
import { resetPassword } from "../../../api/apiUser";
import { useNavigate } from "react-router-dom";

const ChangePassword = ({ email }) => {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleResetPassword = async (values) => {
    const { password } = values;
    setLoading(true);
    try {
      const res = await resetPassword(email, password);
      if (res.data.code === 200) {
        notification.success({
          message: "Đặt lại mật khẩu thành công",
        });
        form.resetFields();
        navigate("/");
      }
    } catch (err) {
      notification.error({
        message: "Lỗi",
        description: err.response?.data.message || "Đặt lại mật khẩu thất bại",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password">
      <h2>Đặt lại mật khẩu</h2>
      <Form form={form} onFinish={handleResetPassword} layout="vertical">
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
            { pattern: /[A-Z]/, message: "Mật khẩu phải có ít nhất một chữ cái in hoa!" },
            { pattern: /\d/, message: "Mật khẩu phải có ít nhất một chữ số!" },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Vui lòng nhập lại mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="change-password__button"
          >
            Đặt lại mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
