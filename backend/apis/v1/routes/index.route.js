const courseRoutes = require("./course.route");
const userRoutes = require("./user.route");
const noteRoutes = require("./note.route");
const flashcardRoutes = require("./flashcard.route");
const topicRoutes = require("./topic.route");
const chapterRoutes = require("./chapter.route");
const lessonRoutes = require("./lesson.route");
const vocabularyRoutes = require("./vocabulary.route");
const exerciseRoutes = require("./exercise.route");
const historyRoutes = require("./history.route");
const sentenceRoutes = require("./sentence.route");
const grammarRoutes = require("./grammar.route");
const progressRoutes = require("./progress.route");

module.exports = (app) => {
    const version = "/api/v1";
    app.use(version + "/courses", courseRoutes);
    app.use(version + "/users", userRoutes);
    app.use(version + "/notes", noteRoutes);
    app.use(version + "/flashcards", flashcardRoutes);
    app.use(version + "/topics", topicRoutes);
    app.use(version + "/chapters", chapterRoutes);
    app.use(version + "/lessons", lessonRoutes);
    app.use(version + "/vocabularies", vocabularyRoutes);
    app.use(version + "/exercises", exerciseRoutes);
    app.use(version + "/histories", historyRoutes);
    app.use(version + "/sentences", sentenceRoutes);
    app.use(version + "/grammars", grammarRoutes);
    app.use(version + "/progresses", progressRoutes);
}