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

### 5. Demo
![Login](https://github.com/user-attachments/assets/b05fed3b-11c0-4a13-b118-486bc753ff10)
![Home](https://github.com/user-attachments/assets/9cea784c-ce79-432d-bb38-b3e65c5defb4)
![Course](https://github.com/user-attachments/assets/716901c4-8b59-46b1-a381-e2414cf089a1)
![Method](https://github.com/user-attachments/assets/8366414f-28f0-490a-b730-491d12ef443b)
![Quoutes](https://github.com/user-attachments/assets/d43557be-55d9-4604-bb2c-a269521b64e5)
![Flashcard](https://github.com/user-attachments/assets/3f46eabf-d529-4833-8b76-72bd1eae9917)
![Game - MemoryMatch](https://github.com/user-attachments/assets/5d5a8cb7-a740-4dba-97b4-8a208184574e)
![Note](https://github.com/user-attachments/assets/65668e02-a2ae-490d-b062-7cebeccaf9c1)
![Progress](https://github.com/user-attachments/assets/c28a27e2-612b-4e64-8d9b-d57c3614fd4c)
![Dashboard Admin](https://github.com/user-attachments/assets/0230d3ff-4cf3-4e9a-9c09-d1400e46ca42)
![ManageCourse](https://github.com/user-attachments/assets/cd20a2b9-dedd-4b6a-8bdc-573379e48d61)





