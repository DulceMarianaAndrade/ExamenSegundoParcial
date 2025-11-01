const express = require("express");
const router = express.Router();
const { getExamTime, startExam, submitAnswers } = require("../controllers/examen.controller");
const { authRequired } = require("../middleware/auth.middleware");

//rutas están protegidas con authRequired
router.get("/tiempo", authRequired, getExamTime);
router.post("/start", authRequired, startExam);
router.post("/submit", authRequired, submitAnswers);

module.exports = router;