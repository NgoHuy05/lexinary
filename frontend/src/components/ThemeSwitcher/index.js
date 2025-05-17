import React, { useEffect, useState } from "react";
import { Switch } from "antd";

const ThemeSwitcher = ({ onChange }) => {
  const [checked, setChecked] = useState(false); // Trạng thái cho switch

  useEffect(() => {
    // Kiểm tra trạng thái theme khi tải trang
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setChecked(true);
    }
  }, []);

  const handleSwitch = (checked) => {
    const newTheme = checked ? "dark" : "light";
    setChecked(checked); // Cập nhật trạng thái của switch
    onChange(newTheme); // Gọi hàm onChange để thay đổi theme
    localStorage.setItem("theme", newTheme); // Lưu trạng thái vào localStorage
  };

  return (
    <div>
      <span>Chế độ tối:</span>
      <Switch checked={checked} onChange={handleSwitch} />
    </div>
  );
};

export default ThemeSwitcher;
