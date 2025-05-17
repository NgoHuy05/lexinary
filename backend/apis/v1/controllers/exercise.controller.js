const Exercise = require("../models/Exercise.models");
const Lesson = require("../models/Lesson.models");


// Lấy tất cả bài tập
exports.getAllExercises = async (req, res) => {
    try {
      const exercises = await Exercise.find().populate("lesson");
      res.status(200).json(exercises);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Lấy bài tập theo ID
  exports.getExerciseById = async (req, res) => {
    try {
      const exercise = await Exercise.findById(req.params.id).populate("lesson");
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }
      res.status(200).json(exercise);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Lấy tất cả bài tập theo lessonId
  exports.getExercisesByLesson = async (req, res) => {
    try {
      const exercises = await Exercise.find({ lesson: req.params.lessonId }).populate("lesson");
      res.status(200).json(exercises);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

// Tạo mới bài tập
module.exports.createExercise = async (req, res) => {
    try {
      const exercisesArray = req.body; // Mảng bài tập từ request
  
      // Thêm nhiều bài tập vào cơ sở dữ liệu cùng lúc
      const savedExercises = await Exercise.insertMany(exercisesArray);
  
      // Cập nhật lesson với các bài tập mới
      const lessonId = exercisesArray[0].lesson; // Lấy lessonId từ bài tập đầu tiên
      const lesson = await Lesson.findById(lessonId);
      if (!lesson) {
        return res.status(400).json({ message: "Lesson không tồn tại" });
      }
  
      lesson.exercises.push(...savedExercises.map(ex => ex._id));
      await lesson.save();
  
      res.status(201).json(savedExercises);
    } catch (error) {
      res.status(500).json({ message: error.message || "Lỗi server" });
    }
  };
  

// Cập nhật bài tập
exports.updateExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa bài tập
exports.deleteExercise = async (req, res) => {
    try {
      const exercise = await Exercise.findByIdAndDelete(req.params.id);
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }
  
      // Sau khi xóa bài tập, xóa luôn ID bài tập đó trong Lesson
      await Lesson.findByIdAndUpdate(
        exercise.lesson,
        { $pull: { exercises: exercise._id } }
      );
  
      res.status(200).json({ message: "Exercise deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  