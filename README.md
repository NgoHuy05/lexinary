# 📘 Learn English – Web học từ vựng tiếng Anh Lexinary

Dự án fullstack học từ vựng tiếng Anh sử dụng MERN Stack, giúp người dùng học tiếng anh hiệu quả.

---

## 🚀 Hướng dẫn cài đặt toàn bộ dự án

Đảm bảo bạn đã cài:
- [Node.js](https://nodejs.org/) (>= 18) – bắt buộc để chạy cả frontend (React) và backend (Express)
- [MongoDB](https://www.mongodb.com/try/download/community) – cài local hoặc dùng MongoDB Atlas
- [Visual Studio Code](https://code.visualstudio.com/) – khuyến nghị dùng để lập trình dễ dàng hơn
- [Google Chrome](https://www.google.com/chrome/) – khuyên dùng để dev/test frontend tốt hơn

### 1. Cài đặt các thư viện cần thiết
cd backend: npm install
npm install --save-dev nodemon
npm install bcrypt@^5.1.1 \
body-parser@^2.2.0 \
cookie-parser@^1.4.7 \
cors@^2.8.5 \
dotenv@^16.4.7 \
express@^4.21.2 \
jsonwebtoken@^9.0.2 \
mongodb@^6.16.0 \
mongoose@^8.13.1 \

cd frontend: npm install

npm install @ant-design/plots@^2.3.3 \
antd@^5.24.4 \
axios@^1.8.4 \
chart.js@^4.4.9 \
firebase@^11.8.1 \
framer-motion@^12.6.3 \js-cookie@^3.0.5 \
react@^18.3.1 \
react-chartjs-2@^5.3.0 \
react-dom@^18.3.1 \
react-icons@^5.5.0 \
react-redux@^9.2.0 \
react-router-dom@^7.4.0 \
react-scripts@5.0.1 \

### 📂 2. Cài đặt Backend

Vào thư mục backend:

```bash
Tạo file .env trong thư mục backend với nội dung:

PORT=YOUR_PORT
MONGO_URL=YOUR_MONGO_URL
JWT_SECRET=your_jwt_secret
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_app_password

Chạy server: npm start
```

### 💻 3. Cài đặt Frontend
Chuyển sang thư mục frontend:
```bash

Tạo file .env trong thư mục frontend:
REACT_APP_API_URL=YOUR_REACT_APP_API_URL
Chạy ứng dụng React:
npm start
```

### 🔗 4. Kết nối Frontend ↔ Backend
Biến môi trường REACT_APP_API_URL sẽ giúp frontend tự động gọi API từ backend. Chỉ cần backend chạy đúng tại REACT_APP_API_URL là hệ thống hoạt động bình thường.
