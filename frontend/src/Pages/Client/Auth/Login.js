import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.webp";
import { Form, Input, Button, Divider, message } from "antd";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "../../../UI/LoginForm.scss";
import { Header } from "antd/es/layout/layout";
import Cookies from "js-cookie";
import { getUserProfile, loginUser } from "../../../api/apiUser";
import { createProgress, getUserProgress } from "../../../api/apiProgress";

const Login = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            // Gửi request đăng nhập
            const response = await loginUser(values.email, values.password);

            if (response.data.code === 200) {
                const userInfoResponse = await getUserProfile();

                // Lưu thông tin người dùng vào cookie
                const userData = userInfoResponse.data.user;
                Cookies.set("id", userData._id, { expires: 1, path: "/" });
                Cookies.set("name", userData.name, { expires: 1, path: "/" });
                Cookies.set("email", userData.email, { expires: 1, path: "/" });
                Cookies.set("status", true, { expires: 1, path: "/" });
                Cookies.set("role", userData.role, { expires: 1, path: "/" });
                
                const progressResponse = await getUserProgress(userData._id);
                if (progressResponse.data.message === "Progress not found") {
                    await createProgress({ userId: userData._id });  
                }
                message.success("Đăng nhập thành công!");
                navigate("/");  // Chuyển hướng về trang chủ
                window.location.reload();
            } else {
                message.error("Đăng nhập thất bại!");
            }
        } catch (error) {
            console.error(error);
            message.error("Email hoặc mật khẩu không chính xác!");

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
                    <h2 className="title">Đăng nhập</h2>
                    <Form
                        name="login"
                        layout="vertical"
                        className="form"
                        onFinish={onFinish}
                    >
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
                            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                        >
                            <Input.Password className="input" placeholder="Nhập mật khẩu" />
                        </Form.Item>

                        <div className="forgotPassword">
                            <NavLink to="/password-forgot">Quên mật khẩu?</NavLink>
                        </div>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="button">
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>

                    <Divider className="divider">Hoặc</Divider>

                    <div className="authButtons">
                        <Button icon={<GoogleOutlined />} className="google">
                            Đăng nhập với Google
                        </Button>
                        <Button icon={<FacebookOutlined />} className="facebook">
                            Đăng nhập với Facebook
                        </Button>
                    </div>

                    <div className="register">
                        Bạn chưa có tài khoản? <NavLink to="/register">Đăng ký</NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
