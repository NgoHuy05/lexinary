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

// Hàm xáo trộn và đảm bảo không có cặp word và meaning cạnh nhau
function generateCards(vocabulary, cardLimit) {
    // Tạo các cặp thẻ word và meaning
    const pairedCards = vocabulary.map(item => [
        { type: "word", text: item.word, id: item.word },
        { type: "meaning", text: item.meaning, id: item.word }
    ]).flat();

    // Lấy số thẻ đã giới hạn và đảm bảo là số chẵn
    const limit = cardLimit % 2 === 0 ? cardLimit : cardLimit - 1;

    // Trộn thẻ với Fisher-Yates
    let shuffledCards = fisherYatesShuffle(pairedCards.slice(0, limit));

    // Đảm bảo không có cặp word-meaning của cùng một từ cạnh nhau
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

        // Nếu có cặp word-meaning cạnh nhau, thử lại việc xáo trộn
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




export default function MemoryMatch() {
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
    const [cardLimit, setCardLimit] = useState(50);  // Default card limit
    const timeRemainingRef = useRef(timeLimit);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        timeRemainingRef.current = timeRemaining;
    }, [timeRemaining]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isPaused && timeRemainingRef.current > 0 && !gameOver) {
                timeRemainingRef.current -= 1;
                setTimeRemaining(timeRemainingRef.current);
            } else if (timeRemainingRef.current <= 0) {
                setGameOver(true);
                message.error("Game Over! Thời gian đã hết.");
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [gameOver, isPaused]);


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
    };
const restart = async () => {
    setLoading(true); // Bắt đầu loading
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
    setLoading(false); // Kết thúc loading
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
                <div className="memory-match__win">
                    <h2>🎉 Congratulation!</h2>
                    <p>Bạn đã ghép đúng tất cả các cặp từ.</p>
                    <p>Tổng số lượt đoán: {turns}</p>
                    <Button
                        type="primary"
                        icon={<ReloadOutlined />}
                        onClick={restart}
                        style={{ marginTop: 20 }}
                    >
                        Chơi lại
                    </Button>
                </div>
            ) :
                gameOver ? (
                    <div className="memory-match__gameover">
                        <h2>🛑 Game Over!</h2>
                        <p>Bạn đã hết thời gian hoặc lượt đoán.</p>
                        <p>Tổng số lượt đoán: {turns}</p>
                        <Button
                            type="primary"
                            icon={<ReloadOutlined />}
                            onClick={restart}
                            style={{ marginTop: 20 }}
                        >
                            Chơi lại
                        </Button>
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


