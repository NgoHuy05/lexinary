const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.models");
const Lesson = require("../models/Lesson.models");
const ForgotPassword = require("../models/ForgotPassword.models");
const generateHelper = require("../helpers/generateRandom");
const sendMailHelper = require("../helpers/sendMail");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

// Đăng ký người dùng mới, mã hóa mật khẩu và lưu vào DB
module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existEmail = await User.findOne({ email, deleted: false });
    if (existEmail) {
      return res.status(400).json({
        code: 400,
        message: "Email already exists"
      });
    }
    const userRole = role || 'user';
    const user = new User({ name, email, password: hashedPassword, role: userRole });
    await user.save();
    res.status(200).json({
      code: 200,
      message: "Create account success"
    });
  } catch (error) {
    console.error("Lỗi đăng ký người dùng:", error);
    res.status(500).json({
      code: 500,
      message: "Internal Server Error"
    });
  }
};

// Đăng nhập người dùng, kiểm tra mật khẩu, tạo token và trả về cookie
module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, deleted: false });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        code: 400,
        message: "Email hoặc mật khẩu không chính xác"
      });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      code: 200,
      message: "Đăng nhập thành công"
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({
      code: 500,
      message: "Lỗi máy chủ"
    });
  }
};

// Đăng xuất người dùng, xóa cookie token
module.exports.logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    code: 200,
    message: "Logout success"
  });
};

// Yêu cầu quên mật khẩu: tạo OTP, lưu DB và gửi mail
module.exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email, deleted: false });
    if (!user) return res.status(400).json({
      code: 400,
      message: "Email không tồn tại"
    });

    // Xóa OTP cũ nếu có
    await ForgotPassword.deleteOne({ email });

    // Tạo OTP mới có hiệu lực 3 phút
    const otp = generateHelper.generateRandomNumber(6);
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000);
    const otpRecord = new ForgotPassword({
      email: email,
      otp: otp,
      expiresAt: expiresAt,
    });
    await otpRecord.save();

    // Gửi mail OTP
    sendMailHelper.sendMail(email, "OTP Reset Password", `Mã OTP: <b>${otp}</b>`);

    res.json({
      code: 200,
      message: "OTP đã được gửi qua email. Vui lòng nhập mã OTP trong 5 phút."
    });
  } catch (error) {
    console.error("Lỗi gửi OTP:", error);
    res.status(500).json({
      code: 500,
      message: "Lỗi máy chủ"
    });
  }
};

// Xác thực OTP: kiểm tra OTP còn hiệu lực hay không
module.exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpRecord = await ForgotPassword.findOne({
      email,
      otp,
      expiresAt: { $gt: new Date() },  // OTP chưa hết hạn
    });

    if (!otpRecord) {
      return res.status(400).json({
        code: 400,
        message: "OTP không hợp lệ hoặc đã hết hạn"
      });
    }

    // Xóa OTP sau khi xác thực thành công
    await ForgotPassword.deleteOne({ email });

    res.json({
      code: 200,
      message: "OTP hợp lệ, tiếp tục đặt lại mật khẩu"
    });
  } catch (error) {
    console.error("Lỗi khi xác thực OTP:", error);
    res.status(500).json({
      code: 500,
      message: "Lỗi máy chủ"
    });
  }
};

// Hàm đặt lại mật khẩu cho user
module.exports.resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra email và password có gửi lên không
    if (!email || !password) {
      return res.status(400).json({
        code: 400,
        message: "mật khẩu không được để trống"
      });
    }

    // Tìm user theo email và chưa bị xóa
    const user = await User.findOne({ email, deleted: false });
    if (!user) return res.status(400).json({
      code: 400,
      message: "Người dùng không tồn tại"
    });

    // Kiểm tra xem mật khẩu mới có giống mật khẩu cũ không
    if (await bcrypt.compare(password, user.password)) {
      return res.status(400).json({
        code: 400,
        message: "Vui lòng nhập mật khẩu khác mật khẩu cũ"
      });
    }
    // Mã hóa mật khẩu mới
    user.password = await bcrypt.hash(password, 10);
    // Lưu mật khẩu mới vào DB
    await user.save();

    res.json({
      code: 200,
      message: "Đổi mật khẩu thành công"
    });
  } catch (error) {
    console.error("Lỗi đặt lại mật khẩu:", error);
    res.status(500).json({
      code: 500,
      message: "Lỗi máy chủ"
    });
  }
};

// Hàm lấy thông tin profile của user (đã loại bỏ password)
module.exports.getUserProfile = async (req, res) => {
  try {
    // req.user.id lấy từ middleware xác thực token
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({
      code: 404,
      message: "Người dùng không tồn tại"
    });
    res.json({
      code: 200,
      message: "Lấy thông tin thành công",
      user
    });
  } catch (error) {
    console.error("Lỗi lấy thông tin:", error);
    res.status(500).json({
      code: 500,
      message: "Lỗi máy chủ"
    });
  }
};

// Hàm cập nhật thông tin user dựa trên dữ liệu gửi lên
module.exports.updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;
    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({ message: "Dữ liệu cập nhật không hợp lệ" });
    }

    // Tìm user theo id lấy từ token
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Cập nhật từng field nếu có giá trị hợp lệ
    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined && updates[key] !== null && updates[key] !== '') {
        user[key] = updates[key];
      }
    });

    await user.save();

    res.status(200).json({
      message: "Cập nhật thành công",
      user: user
    });
  } catch (err) {
    console.error("Lỗi cập nhật:", err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

// Hàm lấy danh sách tất cả người dùng (loại bỏ password)
module.exports.listUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    console.error("Lỗi lấy danh sách:", error);
    res.status(500).json({
      code: 500,
      message: "Lỗi máy chủ",
    });
  }
};

// Hàm đánh dấu bài học đã hoàn thành cho user
module.exports.markLessonCompleted = async (req, res) => {
  try {
    const { userId, lessonId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại." });
    }

    // Kiểm tra bài học đã tồn tại trong progress chưa
    const existing = user.progress.find(
      (p) => p.lesson.toString() === lessonId
    );

    if (existing) {
      existing.completed = true;
    } else {
      user.progress.push({ lesson: lessonId, completed: true });
    }

    await user.save();
    res.json({ message: "Đã đánh dấu hoàn thành bài học." });
  } catch (error) {
    console.error("Lỗi khi cập nhật progress:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

// Hàm lấy danh sách bài học đã hoàn thành của user
module.exports.getCompletedLessons = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại." });
    }

    // Lọc ra các lesson đã completed trong progress
    const completedLessonIds = user.progress
      .filter(p => p.completed)
      .map(p => p.lesson);

    // Tìm các bài học tương ứng
    const completedLessons = await Lesson.find({
      '_id': { $in: completedLessonIds }
    });

    if (completedLessons.length === 0) {
      return res.status(200).json({ message: "Không có bài học nào đã hoàn thành." });
    }

    res.json({ completedLessons });
  } catch (err) {
    console.error("Lỗi khi lấy completed lessons:", err);
    res.status(500).json({ error: "Không thể lấy progress" });
  }
};

// Hàm cập nhật user theo id (dùng cho admin hoặc mục đích khác)
module.exports.updateUserById = async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    res.status(200).json({ message: "Cập nhật thành công", data: updatedUser });
  } catch (error) {
    console.error("Lỗi update user:", error);
    res.status(500).json({ message: "Lỗi server khi cập nhật người dùng" });
  }
};

// Hàm xóa user theo id
module.exports.deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    res.json({ message: "Xóa người dùng thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa user:", error);
    res.status(500).json({ message: "Lỗi server khi xóa người dùng" });
  }
};
