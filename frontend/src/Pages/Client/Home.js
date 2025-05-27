import React from "react";
import { Button, Card, Col, Row } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import "../../UI/Home.scss";
import Cookies from "js-cookie";

function Home() {
    const navigate = useNavigate();
    const userId = Cookies.get("id");
    const features = [
        {
            title: "Học từ vựng, ngữ pháp, mẫu câu theo chủ đề",
            description: "Học từ vựng, ngữ pháp, mẫu câu  dễ dàng hơn bằng cách chia theo các chủ đề phổ biến.",
            items: ["Chủ đề đa dạng", "Bài tập theo chủ đề"],
            link: "/courses",
        },
        {
            title: "Ghi chú",
            description: "Ghi lại các từ vựng quan trọng và mẹo nhớ giúp bạn dễ dàng ôn tập.",
            items: ["Tạo ghi chú cá nhân", "Tạo được các task nhỏ"],
            link: "/note",
        },
        {
            title: "Học từ vựng với flashcard",
            description: "Phương pháp học bằng flashcard.",
            items: ["Flashcards thông minh", "Ôn luyện bằng flashcard",],
            link: "/flashcard",
        },
        {
            title: "Chơi game & luyện tập",
            description: "Trò chơi thú vị giúp cải thiện từ vựng mà không nhàm chán.",
            items: ["Game nối từ vựng", "Thử thách trí nhớ", "Giải trí sau giờ học căng thẳng"],
            link: "/game",
        },
    ];
    return (
        <>
            <div className="homeContent">

                <div className="text00">Welcome</div>
                <div className="text01">Chào mừng bạn đến với Lexinary</div>
                <div className="text02">
                    <div className="text021">Hệ thống học tiếng Anh </div>
                    <div className="text022">thông minh </div>
                </div>
                {userId ? (
                    <Button className="ant-btn1" type="primary" onClick={() => navigate("/courses")}>Vào thư viện khóa học</Button>
                ) : (
                    <div className="login-register">
                        <Button className="ant-btn1" type="primary" onClick={() => navigate("/register")}>Bạn là người mới? Đăng ký</Button>
                        <Button className="ant-btn2" type="primary" onClick={() => navigate("/login")}>Bạn đã có tài khoản? Đăng nhập</Button>
                    </div>
                )}


            </div>

            <div className="homeTarget">
                <h2 className="targetTitle">Khám phá các tính năng</h2>
                <Row gutter={[30, 30]} justify="center">
                    {features.map((feature, index) => (
                        <Col key={index} xs={24} sm={12} md={12} lg={12} xl={12} flex="1">
                            <NavLink to={feature.link} style={{ textDecoration: "none" }}>
                                <Card className="targetBox">
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                    <ul>
                                        {feature.items.map((item, i) => (
                                            <li key={i}>{item} ✓</li>
                                        ))}
                                    </ul>
                                </Card>
                            </NavLink>
                        </Col>
                    ))}
                </Row>
            </div>

        </>
    );
}

export default Home;
