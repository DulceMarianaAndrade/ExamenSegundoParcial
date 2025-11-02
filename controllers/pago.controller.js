const users = require("../data/users");

//Pago del examen
exports.simularPago = (req, res) => {
  const cuenta = req.userCuenta; //viene del token
  const user = users.find(u => u.cuenta === cuenta);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado." });
  }

  //Si ya pagó, que no pueda pagar otra vez
  if (user.pago) {
    return res.status(400).json({ msg: "Ya has realizado el pago." });
  }

  //pago exitoso
  user.pago = true;

  console.log(`[PAGO] Usuario: ${user.cuenta} ha pagado su examen`);

  res.json({
    msg: "Pago realizado correctamente.",
    usuario: {
      cuenta: user.cuenta,
      nombre: user.nombreCompleto,
      pago: user.pago
    }
  });
};
