import React, { useEffect, useState } from "react";
import { Card, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import "../../../../UI/Game.scss";
import Cookies from "js-cookie";
import memory from "../../../../assets/images/memory.jpg";

const games = [
  { title: "🧠 Memory Match", path: "/game/memory", img: memory },
  { title: "🗺 Vocabulary Adventure", path: "/game/adventure", img: "/img/adventure.jpg" },
];

export default function Game() {
  const navigate = useNavigate();
  const userId = Cookies.get("id");

useEffect(() => {
  if (!userId) {
    message.warning("Vui lòng đăng nhập để xem game");
    navigate("/login");
  }
}, []);

  return (
    <>
    {userId && (
    <div className="game">
      <h1 className="game__title">🎮 Chọn Trò Chơi Từ Vựng</h1>
      <Row className="game__grid">
        {games.map((game, index) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} key={index}>
            <Card
              className="game__card"
              hoverable
              cover={<img alt={game.title} src={game.img} className="game__image" />}
              onClick={() => navigate(game.path)}
            >
              <Card.Meta title={game.title} className="game__meta" />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    )
  }
    </>
  );
}
