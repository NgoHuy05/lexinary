  const mongoose = require("mongoose");

  const userSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      token: String,
      enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Khóa học đã tham gia
      progress: [
        {
          lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
          completed: { type: Boolean, default: false },
        },
      ],
      lastSentAt: { type: Date, default: Date.now },
      deleted: {
        type: Boolean,
        default: false
      },
      deletedAt: Date,
      birthday: Date , // Ngày sinh
      gender: { 
        type: String, 
        enum: ['male', 'female', 'other'], // Các giá trị hợp lệ cho giới tính
        default: 'male' // Mặc định là nam
      },
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
      },      
      phone: { type: String }, // Số điện thoại
      address: { type: String } // Địa chỉ
    },
    { timestamps: true }
  );
const User = mongoose.model("User", userSchema);
module.exports = User;
