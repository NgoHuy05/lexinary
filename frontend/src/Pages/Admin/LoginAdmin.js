import React from "react";
import { Form, Input, Button } from 'antd';
import "../../UI/LoginAdmin.scss"
function LoginAdmin() {
    const onFinish = (values) => {
        console.log("Đăng nhập với:", values);
        alert("Đăng nhập thành công!");
    };

    return (
        <>
            <div className="header__admin">
                <div className="header__admin--title">Lexinary</div>
            </div>
            <div className="container__admin">
                <div className="card__admin">
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
                            rules={[
                                { required: true, message: "Vui lòng nhập email!" },
                                { type: "email", message: "Email không hợp lệ!" },
                            ]}
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

                        <Button type='primary' className='button'> Đăng Nhập</Button>
                    </Form>
                </div>
                </div>
        </>
    );
}

export default LoginAdmin;