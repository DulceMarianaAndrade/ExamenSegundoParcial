//para guardar los mensajes
const mensajes = [];

exports.enviarMensaje = (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios."
    });
  }

  // Guardar mensaje en memoria (simulado)
  const nuevoMensaje = {
    id: mensajes.length + 1,
    nombre,
    email,
    mensaje,
    fecha: new Date().toLocaleString()
  };
  mensajes.push(nuevoMensaje);

  console.log(`[CONTACTO] Mensaje recibido de ${nombre} <${email}>`);

  res.json({
    msg: "Mensaje enviado correctamente.",
    mensaje: nuevoMensaje
  });
};