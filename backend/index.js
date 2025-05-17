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

const port = process.env.PORT || 5000;

// Cho phép frontend truy cập
app.use(cors({
    origin: "http://localhost:3000",  // Nếu deploy: thay thành domain thật
    credentials: true  
}));

database.connect();
app.use(bodyParser.json());
app.use(cookieParser());


// API ROUTES
routesApiVer1(app);


app.listen(port, () => {
    console.log(`success on port ${port}`);
});
