const express = require("express");
const router = express.Router();

const { login, logout, verify, getUser } = require("../controllers/auth.controller");

//Rutas del login/logout
router.post("/login", login);
router.post("/logout", logout);

//Para cargar Sesión
router.post("/verify", authRequired, verify);
router.get("/user", authRequired, getUser);

module.exports = router;