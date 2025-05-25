import React from "react";
import { Form, Input, Button, Divider, message } from "antd";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "../../../UI/RegisterForm.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import logo from "../../../assets/images/logo.webp";
import { registerUser } from "../../../api/apiUser";

function Register() {
    // Xử lý khi form được submit
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            // eslint-disable-next-line
            const response = await registerUser(values.name,values.email, values.password,);
            // Xử lý thành công
            message.success("Đăng ký thành công!");
            navigate("/login");  // Chuyển hướng sau khi đăng ký thành công
        } catch (error) {
    
            if (error.response && error.response.data && error.response.data.errors) {
                // Duyệt qua các lỗi và hiển thị thông báo tương ứng
                error.response.data.errors.forEach((err) => {
                    if (err.param === "email" && err.msg === "Email đã tồn tại") {
                        message.error("Email đã tồn tại!");  // Hiển thị thông báo lỗi email đã tồn tại
                    } else if (err.param === "password" && err.msg === "Mật khẩu phải có ít nhất 8 ký tự") {
                        message.error("Mật khẩu phải có ít nhất 8 ký tự!");  // Hiển thị thông báo mật khẩu ngắn
                    } else {
                        // Xử lý các lỗi khác (nếu có)
                        message.error(err.msg);  // Hiển thị lỗi chung
                    }
                });
            } else {
                message.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
            }
        }
    };
    
    
    

    return (
        <>
            <Header className="header">
                <NavLink to="/">
                    <div className="header__logo">
                        <img src={logo} alt="logo" />
                        <span className="header__brand">Lexinary</span>
                    </div>
                </NavLink>
                <div className="header__greeting">
                    <span>Hi, my name is Lexinary.</span>
                    <span>Welcome back!</span>
                </div>
            </Header>
            <div className="container">
                <div className="card">
                    <h2 className="title">Đăng ký</h2>
                    <Form name="register" layout="vertical" className="form" onFinish={onFinish}>
                        <Form.Item
                            label="Họ và Tên"
                            name="name"
                            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                        >
                            <Input className="input" placeholder="Nhập tên của bạn" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: "Vui lòng nhập email!" }, { type: "email", message: "Email không hợp lệ!" }]}
                        >
                            <Input className="input" placeholder="Nhập email" />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                { required: true, message: "Vui lòng nhập mật khẩu!" },
                                { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
                                { pattern: /[A-Z]/, message: "Mật khẩu phải có ít nhất một chữ cái in hoa!" },
                                { pattern: /\d/, message: "Mật khẩu phải có ít nhất một chữ số!" },
                            ]}                        >
                            <Input.Password className="input" placeholder="Nhập mật khẩu" />
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
                            <Input.Password className="input" placeholder="Nhập lại mật khẩu" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="button">
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* <Divider className="divider">Hoặc</Divider>

                    <div className="authButtons">
                        <Button icon={<GoogleOutlined />} className="google">
                            Đăng ký với Google
                        </Button>
                        <Button icon={<FacebookOutlined />} className="facebook">
                            Đăng ký với Facebook
                        </Button>
                    </div> */}

                    <div className="login">
                        Bạn đã có tài khoản? <NavLink to="/login">Đăng nhập</NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
