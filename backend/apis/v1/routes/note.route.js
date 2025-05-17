const express = require("express");
const router = express.Router();

const controllers = require("../controllers/note.controller");
const verifyMiddleware = require("../middleware/verifyToken.middleware");


router.get("/", verifyMiddleware.verifyToken, controllers.index);
router.post("/create", verifyMiddleware.verifyToken, controllers.createNote);
router.patch("/update/:id", verifyMiddleware.verifyToken, controllers.updateNote);
router.delete("/delete/:id", verifyMiddleware.verifyToken, controllers.deleteNote);

module.exports = router;
