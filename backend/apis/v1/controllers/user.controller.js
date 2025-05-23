const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.models");
const Lesson = require("../models/Lesson.models");
const ForgotPassword = require("../models/ForgotPassword.models");
const generateHelper = require("../helpers/generateRandom");
const sendMailHelper = require("../helpers/sendMail");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

// Đăng ký tài khoản
// Đăng ký tài khoản
module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body; // role được thêm vào
        const hashedPassword = await bcrypt.hash(password, 10);

        const existEmail = await User.findOne({ email, deleted: false });
        if (existEmail) {
            return res.status(400).json({
                code: 400,
                message: "Email already exists"
            });
        }

        // Nếu không có role, mặc định là 'user'
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

// Đăng nhập
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
        
        // Lưu token vào cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Chỉ bật khi chạy trên HTTPS
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000 // 1 ngày
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

// Đăng xuất
module.exports.logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Chỉ dùng `secure` trên môi trường production
        sameSite: "strict",
    });

    return res.status(200).json({
        code: 200,
        message: "Logout success"
    });
};

module.exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email, deleted: false });
        if (!user) return res.status(400).json({
            code: 400,
            message: "Email không tồn tại"
        });

        // Xóa bản ghi OTP cũ nếu có (để tránh nhập mã OTP đã hết hạn)
        await ForgotPassword.deleteOne({ email });

        const otp = generateHelper.generateRandomNumber(6);
        const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // Thời gian hết hạn là 3 phút (UTC)

        // Lưu OTP vào bảng ForgotPassword để xác thực
        const otpRecord = new ForgotPassword({
            email: email,
            otp: otp,
            expiresAt: expiresAt,
        });
        await otpRecord.save();

        // Gửi OTP qua email
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


// Xác thực OTP
module.exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Kiểm tra OTP trong cơ sở dữ liệu
        const otpRecord = await ForgotPassword.findOne({
            email,
            otp,
            expiresAt: { $gt: new Date() },  // Kiểm tra OTP còn hiệu lực (expiresAt > hiện tại)
        });

        if (!otpRecord) {
            return res.status(400).json({
                code: 400,
                message: "OTP không hợp lệ hoặc đã hết hạn"
            });
        }

        // Xóa bản ghi OTP sau khi xác thực thành công
        await ForgotPassword.deleteOne({ email });

        res.json({
            code: 200,
            message: "OTP hợp lệ, tiếp tục đặt lại mật khẩu"
        });
    } catch (error) {
        // Ghi lại lỗi trong server nếu có
        console.error("Lỗi khi xác thực OTP:", error);

        // Trả về lỗi máy chủ
        res.status(500).json({
            code: 500,
            message: "Lỗi máy chủ"
        });
    }
};


module.exports.resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                code: 400,
                message: "mật khẩu không được để trống"
            });
        }

        const user = await User.findOne({ email, deleted: false });
        if (!user) return res.status(400).json({
            code: 400,
            message: "Người dùng không tồn tại"
        });

        // Kiểm tra nếu mật khẩu mới giống mật khẩu cũ
        if (await bcrypt.compare(password, user.password)) {
            return res.status(400).json({
                code: 400,
                message: "Vui lòng nhập mật khẩu khác mật khẩu cũ"
            });
        }

        // Mã hóa mật khẩu mới và lưu vào cơ sở dữ liệu
        user.password = await bcrypt.hash(password, 10);
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



// Lấy thông tin người dùng
module.exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({
            code: 404,
            message: "Người dùng không tồn tại"
        });
        res.json({
            code: 200,
            message: "Lấy thông tin thành công", user
        });
    } catch (error) {
        console.error("Lỗi lấy thông tin:", error);
        res.status(500).json({
            code: 500,
            message: "Lỗi máy chủ"
        });
    }
};





module.exports.updateUserProfile = async (req, res) => {
    try {
      const updates = req.body;
  
      if (!updates || typeof updates !== 'object') {
        return res.status(400).json({ message: "Dữ liệu cập nhật không hợp lệ" });
      }
  
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
  
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

module.exports.markLessonCompleted = async (req, res) => {
    try {
      const { userId, lessonId } = req.params;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "Người dùng không tồn tại." });
      }
  
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
  
  module.exports.getCompletedLessons = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
  
      if (!user) {
        return res.status(404).json({ error: "Người dùng không tồn tại." });
      }
  
      // Lọc ra các bài học đã hoàn thành
      const completedLessons = await Lesson.find({
        '_id': { $in: user.progress.filter(p => p.completed).map(p => p.lesson) }
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

module.exports.updateUserById = async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body; // dữ liệu gửi lên để cập nhật

  try {
    // Tìm user và cập nhật, trả về user mới sau cập nhật
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true, // trả về bản cập nhật mới
      runValidators: true, // kiểm tra valid theo schema
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

module.exports.deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    res.json({ message: "Xóa người dùng thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi xóa người dùng" });
  }
};