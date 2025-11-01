const express = require("express");
const router = express.Router();

const { login, logout } = require("../controllers/auth.controller");

//Rutas del login/logout
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;