export const formatWord = (word) => {
    return {
      id: word._id,
      text: word.text,
      meaning: word.meaning,
      example: word.example || "Chưa có ví dụ",
    };
  };
  