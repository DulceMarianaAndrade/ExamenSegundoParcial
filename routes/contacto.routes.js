const express = require("express");
const router = express.Router();
const { enviarMensaje } = require("../controllers/contacto.controller");

//Ruta de enviar mensaje
router.post("/enviar", enviarMensaje);

module.exports = router;