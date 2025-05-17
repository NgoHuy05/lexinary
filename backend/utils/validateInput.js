export const validateWord = (word) => {
    if (!word.text || !word.meaning) return "Từ và nghĩa là bắt buộc!";
    if (word.text.length > 50) return "Từ không quá 50 ký tự!";
    return null; // Hợp lệ
  };
  