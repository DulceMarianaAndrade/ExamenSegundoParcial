const express = require("express");
const router = express.Router();
const { generateCertificate } = require("../controllers/certificate.controller");
const { authRequired } = require("../middleware/auth.middleware");

// Ruta para generar certificado - PROTEGIDA y verifica aprobación
router.post("/generate", authRequired, generateCertificate);

module.exports = router;