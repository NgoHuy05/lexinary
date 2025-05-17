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

app.use(cors({
  origin: allowedOrigins,
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
