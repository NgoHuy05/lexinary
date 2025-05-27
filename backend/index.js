const express = require("express");
const database = require("./apis/v1/config/database");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const routesApiVer1 = require("./apis/v1/routes/index.route");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path"); // <== THÊM DÒNG NÀY

const port = process.env.PORT;

const allowedOrigins = [
  "http://localhost:3000",
  "https://lexinary.vercel.app",
];

// ✅ CORS đứng đầu tiên
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// ✅ Xử lý preflight
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));

// ✅ Fallback set header thủ công
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  }
  next();
});

database.connect();
app.use(bodyParser.json());
app.use(cookieParser());


// API ROUTES
routesApiVer1(app);


app.listen(port, () => {
    console.log(`success on port ${port}`);
});
