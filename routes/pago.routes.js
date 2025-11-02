const express = require("express");
const router = express.Router();
const { simularPago } = require("../controllers/pago.controller");
const { authRequired } = require("../middleware/auth.middleware");

//solo se puede pagar si estás autenticado
router.post("/confirmar", authRequired, simularPago);

module.exports = router;