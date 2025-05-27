import React, { useState, useEffect, useRef } from "react";
import { Card, Row, Col, Select, message, Modal, Button, InputNumber, Spin } from "antd";
import { ReloadOutlined, SettingOutlined, PauseOutlined, PlayCircleOutlined } from "@ant-design/icons";
import "../../../../UI/MemoryMatch.scss";
import { getChapters } from "../../../../api/apiChapter";
import { getVocabularyById } from "../../../../api/apiVocabulary";

const { Option } = Select;

// Hàm Fisher-Yates Shuffle để trộn mảng
function fisherYatesShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Hàm xáo trộn các thẻ
function generateCards(vocabulary, cardLimit) {
    const pairedCards = vocabulary.map(item => [
        { type: "word", text: item.word, id: item.word },
        { type: "meaning", text: item.meaning, id: item.word }
    ]).flat();

    const limit = cardLimit % 2 === 0 ? cardLimit : cardLimit - 1;

    let shuffledCards = fisherYatesShuffle(pairedCards.slice(0, limit));

    let attempts = 0;
    const maxAttempts = 100;
    while (attempts < maxAttempts) {
        let isValid = true;
        for (let i = 0; i < shuffledCards.length - 1; i++) {
            if (shuffledCards[i].id === shuffledCards[i + 1].id) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            break;
        }
        shuffledCards = fisherYatesShuffle(pairedCards.slice(0, limit));
        attempts++;
    }

    return shuffledCards.map((card, index) => ({
        ...card,
        index,
        flipped: false,
        matched: false
    }));
}




function MemoryMatch() {
    const [cards, setCards] = useState([]);
    const [selected, setSelected] = useState([]);
    const [turns, setTurns] = useState(0);
    const [isChapterSelected, setIsChapterSelected] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [timeLimit, setTimeLimit] = useState(5 * 60);
    const [guessLimit, setGuessLimit] = useState(25);
    const [gameOver, setGameOver] = useState(false);
    const [remainingGuesses, setRemainingGuesses] = useState(guessLimit);
    const [timeRemaining, setTimeRemaining] = useState(timeLimit);
    const [isPaused, setIsPaused] = useState(false);
    const [hasShownGameOverMessage, setHasShownGameOverMessage] = useState(false);
    const [isWin, setIsWin] = useState(false);
    const [chapters, setChapters] = useState([]);
    const [cardLimit, setCardLimit] = useState(50);
    const timeRemainingRef = useRef(timeLimit);
    const [loading, setLoading] = useState(false);
    const [isHowToPlayVisible, setIsHowToPlayVisible] = useState(false);


    useEffect(() => {
        timeRemainingRef.current = timeRemaining;
    }, [timeRemaining]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isPaused && !loading && timeRemainingRef.current > 0 && !gameOver) {
                timeRemainingRef.current -= 1;
                setTimeRemaining(timeRemainingRef.current);
            } else if (timeRemainingRef.current <= 0 && !loading) {
                setGameOver(true);
                message.error("Game Over! Thời gian đã hết.");
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [gameOver, isPaused, loading]);

    useEffect(() => {
        async function fetchChapters() {
            try {
                const res = await getChapters("680db491b664b9e4d441d6e6");
                setChapters(res.data);
            } catch (err) {
                message.error("Lỗi khi tải chapters.");
                console.log(err);
            }
        }
        fetchChapters();
    }, []);

    const handleChapterChange = (chapterId) => {
        setSelectedChapter(chapterId);
        setIsChapterSelected(true);
    };

    const handleClick = (index) => {
        if (gameOver || isPaused) return;

        const current = cards[index];
        if (current.flipped || current.matched || selected.length >= 2 || remainingGuesses <= 0) return;

        const updated = [...cards];
        updated[index].flipped = true;
        const newSelected = [...selected, updated[index]];
        setCards(updated);
        setSelected(newSelected);

        if (newSelected.length === 2) {
            setTurns((prev) => prev + 1);
            setRemainingGuesses((prev) => prev - 1);

            const [first, second] = newSelected;
            if (first.id === second.id && first.type !== second.type) {
                setTimeout(() => {
                    const matched = updated.map((c) =>
                        c.id === first.id ? { ...c, matched: true } : c
                    );
                    setCards(matched);
                    setSelected([]);

                    if (matched.every((c) => c.matched)) {
                        message.success("🎉 Bạn đã hoàn thành tất cả cặp!");
                        setIsWin(true);
                    }
                }, 700);
            } else {
                setTimeout(() => {
                    const reset = updated.map((c) =>
                        c.index === first.index || c.index === second.index
                            ? { ...c, flipped: false }
                            : c
                    );
                    setCards(reset);
                    setSelected([]);
                }, 1000);
            }
        }
        if (remainingGuesses - 1 <= 0 && !isWin) {
            setTimeout(() => {
                setGameOver(true);
            }, 1200);
        }
    };
    const restart = async () => {
        setLoading(true);
        setTimeRemaining(timeLimit);
        setRemainingGuesses(guessLimit);
        setTurns(0);
        setGameOver(false);
        setIsWin(false);
        setIsPaused(false);
        setHasShownGameOverMessage(false);

        let vocabIds = [];

        if (selectedChapter === "all") {
            for (const chapter of chapters) {
                for (const lesson of chapter.lessons) {
                    if (lesson.vocabulary?.length > 0) {
                        vocabIds.push(...lesson.vocabulary);
                    }
                }
            }
        } else {
            const chapter = chapters.find(c => c._id === selectedChapter);
            if (chapter) {
                for (const lesson of chapter.lessons) {
                    if (lesson.vocabulary?.length > 0) {
                        vocabIds.push(...lesson.vocabulary);
                    }
                }
            }
        }

        const uniqueVocabIds = [...new Set(vocabIds)];

        const vocabResults = await Promise.all(
            uniqueVocabIds.map(async (id) => {
                try {
                    const res = await getVocabularyById(id);
                    if (res?.data?.word && res?.data?.meaning) return res.data;
                } catch (err) {
                    console.error("Lỗi khi lấy vocab:", id, err);
                }
                return null;
            })
        );

        const allVocabulary = vocabResults.filter(v => v);
        const shuffledVocabulary = fisherYatesShuffle([...allVocabulary]);
        setCards(generateCards(shuffledVocabulary, cardLimit));
        setLoading(false);
    };


    const handleSettingsOk = () => {
        if (!selectedChapter) {
            message.error("Vui lòng chọn một chapter trước khi lưu.");
            return;
        }
        if (cardLimit % 2 !== 0) {
            message.error("Số lượng thẻ phải là số chẵn.");
            return;
        }
        setIsModalVisible(false);
        restart();
    };

    const handleSettingsCancel = () => {
        setIsModalVisible(false);
    };

    const openSettings = () => {
        setIsModalVisible(true);
    };

    const togglePause = () => {
        setIsPaused(!isPaused);
    };

    return (
        <>
            {isWin ? (
                <div className="memory-match__result" style={{ textAlign: 'center', padding: 40 }}>
                    <Card
                        style={{
                            maxWidth: 500,
                            margin: '0 auto',
                            background: '#e6fff5',
                            borderRadius: 16,
                            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                        }}
                    >
                        <h2 style={{ fontSize: 28 }}>🎉 Chúc mừng!</h2>
                        <p style={{ fontSize: 18 }}>Bạn đã ghép đúng tất cả các cặp từ 🎯</p>
                        <p style={{ fontSize: 16 }}>Tổng số lượt đoán: <strong>{turns}</strong></p>
                        <Button
                            type="primary"
                            icon={<ReloadOutlined />}
                            onClick={restart}
                            size="large"
                            style={{ marginTop: 20, borderRadius: 8 }}
                        >
                            Chơi lại
                        </Button>
                    </Card>
                </div>
            ) : gameOver ? (
                <div className="memory-match__result" style={{ textAlign: 'center', padding: 40 }}>
                    <Card
                        style={{
                            maxWidth: 500,
                            margin: '0 auto',
                            background: '#fff1f0',
                            borderRadius: 16,
                            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                        }}
                    >
                        <h2 style={{ fontSize: 28 }}>🛑 Game Over</h2>
                        <p style={{ fontSize: 18 }}>Bạn đã hết thời gian hoặc lượt đoán 😢</p>
                        <p style={{ fontSize: 16 }}>Tổng số lượt đoán: <strong>{turns}</strong></p>
                        <Button
                            type="primary"
                            icon={<ReloadOutlined />}
                            onClick={restart}
                            size="large"
                            style={{ marginTop: 20, borderRadius: 8 }}
                        >
                            Chơi lại
                        </Button>
                    </Card>
                </div>
            ) : (
                <div className="memory-match">
                    <h2 className="memory-match__title">🧠 Memory Match</h2>
                    {isChapterSelected && (
                        <p className="memory-match__turns">Lượt đoán còn lại: {remainingGuesses}</p>
                    )}

                    <Button
                        type="primary"
                        icon={<SettingOutlined />}
                        onClick={openSettings}
                        style={{ marginBottom: 20 }}
                    >
                        Thiết lập Game
                    </Button>

                    <Button
                        icon="❓"
                        onClick={() => {
                            setIsHowToPlayVisible(true);
                            togglePause();
                        }}
                        style={{ marginLeft: 10 }}
                    >
                        Hướng dẫn
                    </Button>

                    <Modal
                        title={
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span role="img" aria-label="guide">🧠</span>
                                <span>Hướng dẫn chơi Memory Match</span>
                            </div>
                        }
                        visible={isHowToPlayVisible}
                        onCancel={() => {
                            setIsHowToPlayVisible(false);
                            togglePause();
                        }}
                        footer={[
                            <Button
                                key="ok"
                                type="primary"
                                onClick={() => {
                                    setIsHowToPlayVisible(false);
                                    togglePause();
                                }}
                                style={{ borderRadius: 8, padding: '6px 20px' }}
                            >
                                Đã hiểu
                            </Button>
                        ]}
                        centered
                        bodyStyle={{
                            background: '#f9f9ff',
                            borderRadius: 10,
                            padding: 20,
                        }}
                    >
                        <div style={{ fontSize: 16, lineHeight: 1.7 }}>
                            <ul style={{ paddingLeft: 20 }}>
                                <li><strong>📌 Chọn Chapter:</strong> để bắt đầu trò chơi với các từ đúng với nội dung chương bạn chọn.</li>
                                <li><strong>🃏 Lật thẻ:</strong> gồm từ tiếng Anh và nghĩa của nó.</li>
                                <li><strong>✅ Ghép đúng:</strong> thì sẽ biến mất, sai thì úp lại và bạn bị trừ 1 lần đoán.</li>
                                <li><strong>⏳ Lưu ý:</strong> bạn có giới hạn thời gian và lượt đoán.</li>
                                <li><strong>🏆 Mục tiêu:</strong> ghép hết tất cả các cặp trước khi hết thời gian!</li>
                            </ul>
                        </div>
                    </Modal>


                    <Modal
                        title="Cài đặt Game"
                        visible={isModalVisible}
                        onOk={handleSettingsOk}
                        onCancel={handleSettingsCancel}
                        okText="Lưu"
                    >
                        <div>
                            <h3>Chọn chapter</h3>
                            <Select
                                placeholder="Chọn chapter"
                                value={selectedChapter}
                                onChange={handleChapterChange}
                                style={{ marginBottom: 20, width: "100%" }}
                            >
                                <Option key="all" value="all">Tất cả các chapters</Option>
                                {chapters.map((chapter) => (
                                    <Option key={chapter._id} value={chapter._id}>
                                        {chapter.title}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <h3>Thời gian (phút):</h3>
                            <InputNumber
                                min={1}
                                max={60}
                                defaultValue={5}
                                onChange={(value) => setTimeLimit(value * 60)}
                                style={{ width: "100%" }}
                            />
                        </div>
                        <div>
                            <h3>Giới hạn lượt đoán:</h3>
                            <InputNumber
                                min={1}
                                max={500}
                                defaultValue={25}
                                onChange={setGuessLimit}
                                style={{ width: "100%" }}
                            />
                        </div>
                        <div>
                            <h3>Giới hạn số thẻ:</h3>
                            <InputNumber
                                min={2}
                                max={100}
                                defaultValue={50}
                                step={2}
                                onChange={setCardLimit}
                                style={{ width: "100%" }}
                            />
                        </div>
                    </Modal>
                    <Spin spinning={loading} tip="Đang tải...">
                        {!loading && isChapterSelected && timeRemaining !== null && (
                            <>
                                <div className="memory-match__time">
                                    Thời gian còn lại: {Math.floor(timeRemaining / 60)}:{("0" + (timeRemaining % 60)).slice(-2)}
                                </div>
                                <Button
                                    type="default"
                                    icon={isPaused ? <PlayCircleOutlined /> : <PauseOutlined />}
                                    onClick={togglePause}
                                    style={{ marginBottom: 20 }}
                                >
                                    {isPaused ? "Tiếp tục" : "Dừng game"}
                                </Button>
                            </>
                        )}

                        <Row gutter={[16, 16]} justify="center">
                            {cards.map((card, idx) => (
                                <Col key={idx}>
                                    <Card
                                        onClick={() => handleClick(idx)}
                                        hoverable
                                        className={`memory-match__card ${card.flipped || card.matched ? "flipped" : ""}`}
                                        style={{ visibility: card.matched ? "hidden" : "visible" }}
                                    >
                                        <span className="memory-match__text">
                                            {card.flipped || card.matched ? card.text : "?"}
                                        </span>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Spin>
                    {isChapterSelected && (
                        <Button
                            type="primary"
                            icon={<ReloadOutlined />}
                            onClick={restart}
                            style={{ marginTop: 20 }}
                        >
                            Chơi lại
                        </Button>
                    )}
                </div>
            )}
        </>
    );
}

export default MemoryMatch;