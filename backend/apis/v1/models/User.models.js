  const mongoose = require("mongoose");

  const userSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      progress: [
        {
          lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
          completed: { type: Boolean, default: false },
        },
      ],
      deleted: {
        type: Boolean,
        default: false
      },
      deletedAt: Date,
      birthday: Date , 
      gender: { 
        type: String, 
        enum: ['male', 'female', 'other'], 
        default: 'male'
      },
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
      },      
      phone: { type: String }, 
      address: { type: String } 
    },
    { timestamps: true }
  );
const User = mongoose.model("User", userSchema);
module.exports = User;
