import React, { useEffect, useState } from "react";
import { Switch } from "antd";

const ThemeSwitcher = ({ onChange }) => {
  const [checked, setChecked] = useState(false); 

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setChecked(true);
    }
  }, []);

  const handleSwitch = (checked) => {
    const newTheme = checked ? "dark" : "light";
    setChecked(checked); 
    onChange(newTheme); 
    localStorage.setItem("theme", newTheme); 
  };

  return (
    <div>
      <span>Chế độ tối:</span>
      <Switch checked={checked} onChange={handleSwitch} />
    </div>
  );
};

export default ThemeSwitcher;
