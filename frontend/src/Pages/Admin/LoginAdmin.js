import React from "react";
import { Form, Input, Button, message } from "antd";
import "../../UI/LoginAdmin.scss";
import Cookies from "js-cookie";
import { getUserProfile, loginUser } from "../../api/apiUser";
import { useNavigate } from "react-router-dom";
import { removeAllCookies } from "../../utils/cookie";

function LoginAdmin() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await loginUser(values.email, values.password);

            if (response.data.code === 200) {
                const userInfoResponse = await getUserProfile();
                const userData = userInfoResponse.data.user;

                Cookies.set("id", userData._id, { expires: 1, path: "/" });
                Cookies.set("name", userData.name, { expires: 1, path: "/" });
                Cookies.set("email", userData.email, { expires: 1, path: "/" });
                Cookies.set("role", userData.role, { expires: 1, path: "/" });

                if (userData.role !== "admin") {
                    message.warning("Đăng nhập thất bại: bạn không có quyền truy cập!");
                    removeAllCookies();
                    return;
                }

                message.success("Đăng nhập thành công!");
                navigate("/admin");
            } else {
                message.error("Đăng nhập thất bại!");
            }
        } catch (error) {
            console.error(error);
            message.error("Email hoặc mật khẩu không chính xác!");
        }
    };

    return (
        <div className="login-admin">
            <header className="login-admin__header">
                <h1 className="login-admin__title">Lexinary</h1>
            </header>

            <main className="login-admin__main">
                <div className="login-admin__card">
                    <h2 className="login-admin__card-title">Đăng nhập</h2>

                    <Form
                        name="login"
                        layout="vertical"
                        className="login-admin__form"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Vui lòng nhập email!" },
                                { type: "email", message: "Email không hợp lệ!" },
                            ]}
                        >
                            <Input
                                className="login-admin__input"
                                placeholder="Nhập email"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                        >
                            <Input.Password
                                className="login-admin__input"
                                placeholder="Nhập mật khẩu"
                            />
                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-admin__button"
                        >
                            Đăng Nhập
                        </Button>
                    </Form>
                </div>
            </main>
        </div>
    );
}

export default LoginAdmin;
