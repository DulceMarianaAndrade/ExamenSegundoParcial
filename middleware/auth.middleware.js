// Middleware de autenticación usando las sesiones del controlador
const { sessions } = require("../controllers/auth.controller");

/**
 * Middleware para verificar el token de sesión
 * Espera el token en el header: Authorization: Bearer <token>
 */
exports.authRequired = (req, res, next) => {
    //Obtener el header Authorization
    const authHeader = req.headers.authorization;

    //Verificar que exista y tenga el formato correcto
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
        error: "Token no proporcionado o formato incorrecto",
        formato_esperado: "Authorization: Bearer <token>",
        });
    }

    //Extraer token (remover "Bearer ")
    const token = authHeader.substring(7);

    //Verificar que el token exista en sesiones activas
    const cuenta = sessions[token];

    if (!cuenta) {
        return res.status(401).json({ error: "Token inválido o sesión inexistente" });
    }

    //Guardar info del usuario para el resto del flujo
    req.userCuenta = cuenta;
    req.token = token;

    next();
};
