// ForgotPassword.js
import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification, Spin } from "antd";
import ChangePassword from "./ChangePassword"; // Import component mới
import "../../../UI/ForgotPassword.scss";
import { forgotPassword, verifyOtp } from "../../../api/apiUser";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // step 1: nhập email, 2: nhập OTP, 3: reset mật khẩu
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Gửi OTP");
  const [countdown, setCountdown] = useState(30);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    let timer;
    if (countdown > 0 && isButtonDisabled) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      clearInterval(timer);
      setIsButtonDisabled(false);
      setButtonText("Gửi  OTP");
    }

    return () => clearInterval(timer);
  }, [countdown, isButtonDisabled]);

  useEffect(() => {
    if (isButtonDisabled) {
      setButtonText(`Gửi lại OTP sau ${countdown}s`);
    }
  }, [countdown, isButtonDisabled]);

  const handleSendOtp = async (values) => {
    const { email } = values;
    setEmail(email);
    setLoading(true);
    setButtonText(`Gửi lại OTP`);
    try {
      const res = await forgotPassword (email);
      if (res.data.code === 200) {
        notification.success({
          message: "OTP đã được gửi",
          description: "Vui lòng kiểm tra email để lấy mã OTP.",
        });
        setStep(2);
      }
    } catch (err) {
      console.log(err);
      notification.error({
        message: "Lỗi",
        description: err.response?.data.message
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (values) => {
    const { otp } = values;
    setLoading(true);
    try {
      const res = await verifyOtp (email, otp);
      if (res.data.code === 200) {
        notification.success({
          message: "Xác thực OTP thành công",
        });
        setOtp(otp);
        setStep(3);
      } else {
        notification.error({
          message: "OTP không hợp lệ",
        });
      }
    } catch (err) {
      console.error(err.response?.data);
      notification.error({
        message: "Lỗi",
        description: err.response?.data.message || "Xác thực OTP thất bại",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsButtonDisabled(true);
    setCountdown(30);
    try {
      const res = await forgotPassword ({ email });
      if (res.data.code === 200) {
        notification.success({
          message: "OTP đã được gửi lại",
          description: "Vui lòng kiểm tra email để lấy mã OTP.",
        });
        setButtonText(`Gửi lại OTP sau 30s`);
      }
    } catch (err) {
      notification.error({
        message: "Lỗi",
        description: err.response?.data.message || "Không thể gửi lại OTP.",
      });
    }
  };

  return (
    <div className="forgot-password">
      {step === 1 && (
        <>
          <h2>Quên mật khẩu</h2>
          <Form onFinish={handleSendOtp}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: "email", message: "Vui lòng nhập email hợp lệ!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} disabled={isButtonDisabled}>
                {loading ? <Spin /> : buttonText}
              </Button>
              {isButtonDisabled && (
                <span style={{ marginLeft: "10px", color: "gray" }}>
                  Vui lòng đợi {countdown}s để gửi lại OTP
                </span>
              )}
            </Form.Item>
          </Form>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Nhập mã OTP</h2>
          <Form onFinish={handleVerifyOtp}>
            <Form.Item
              label="OTP"
              name="otp"
              rules={[{ required: true, message: "Vui lòng nhập mã OTP!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Xác nhận OTP
              </Button>
            </Form.Item>
          </Form>

          <div style={{ marginTop: 10, color: "gray" }}>
            {isButtonDisabled
              ? `Bạn chưa nhận được mã OTP? Vui lòng đợi ${countdown}s để gửi lại.`
              : "Nếu bạn chưa nhận được mã OTP, bạn có thể gửi lại OTP."}
          </div>

          <Button
            type="primary"
            onClick={handleResendOtp}
            disabled={isButtonDisabled}
            style={{ marginTop: 10 }}
          >
            {isButtonDisabled ? <Spin size="small" style={{ marginRight: 10 }} /> : null}
            {buttonText}
          </Button>
        </>
      )}

      {step === 3 && <ChangePassword email={email} />}
    </div>
  );
};

export default ForgotPassword;
