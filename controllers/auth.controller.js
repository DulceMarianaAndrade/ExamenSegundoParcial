const crypto = require("crypto"); //Para generar tokens con crypto.randomUUID();
const users = require("../data/users"); //archivo donde se encuentran los usuarios
const sessions = {}; //objeto para guardar las sesiones activas

//LOGIN ========================a========
exports.login = (req, res) => {
    //Extrae 'cuenta' y 'contrasena' del body de la petición
    const { cuenta } = req.body || {};
    const contrasena = req.body?.contrasena ?? req.body?.["contraseña"];

    if (!cuenta || !contrasena) {
        return res.status(400).json({
        error: "Faltan campos obligatorios: 'cuenta' y 'contrasena'."
        });
    }

    //Buscar usuario con cuenta y contraseña
    const match = users.find(u => u.cuenta === cuenta && u.contrasena === contrasena);

    if (!match) {
        return res.status(401).json({ error: "Credenciales inválidas." });
    }

    //Generar token único
    const token = crypto.randomUUID();

    //Guardar sesión activa
    sessions[token] = match.cuenta;
    console.log(`[LOGIN] Usuario: ${match.cuenta} | Token: ${token}`);

    //Responder con el token
    return res.status(200).json({
        mensaje: "Acceso permitido",
        token,
        usuario: { cuenta: match.cuenta, nombre: match.nombreCompleto }
    });
};

//LOGOUT ================================
exports.logout = (req, res) => {
  const { token } = req.body;

  if (!token || !sessions[token]) {
    return res.status(400).json({ msg: "Token no válido o sesión inexistente" });
  }

  // Eliminar token de sesiones
  const cuenta = sessions[token];
  const user = users.find(u => u.id === userId);

  delete sessions[token];
  console.log(`[LOGOUT] Usuario: ${user.nombre} | Token eliminado: ${token}`);

  res.json({ msg: "Sesión cerrada correctamente" });
};

//Exportar sesiones para middleware
exports.sessions = sessions;