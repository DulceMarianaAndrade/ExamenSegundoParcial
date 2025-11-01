const preguntas = require("../data/preguntas");
const users = require("../data/users");

//mezclar aleatoriamente
function mezclar(array) {
  return array.sort(() => Math.random() - 0.5);
}

//Obtener tiempo del examen
exports.getExamTime = (req, res) => {
  const tiempo = { minutos: 20 };
  res.json(tiempo);
};

//Iniciar examen (Enviar preguntas al frontend)
exports.startExam = (req, res) => {
    const cuenta = req.userCuenta;
    const user = users.find(u => u.cuenta === cuenta);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado." });
    
    //Validar si ya realizo el pago
    if (!user.pago){
        return res.status(403).json({ msg: "Debes pagar antes de iniciar el examen." });
    }

    //Validar si ya realizó un intento antes
    if (user.intento) {
        return res.status(403).json({ msg: "Sólo se tiene una oportunidad para realizar el examen," });
    }

    //Seleccionar 8 preguntas aleatorias no repetidas
    const preguntasAleatorias = mezclar(preguntas).slice(0, 8);

    //Mezclar las opciones de respuestas de cada pregunta
    const examen = preguntasAleatorias.map(p => ({
        id: p.id,
        texto: p.texto,
        opciones: mezclar([...p.opciones]) // copia + mezcla
    }));

    //Guardar intento con respuestas correctas
    user.intento = {
        examen,
        respuestasCorrectas: preguntasAleatorias.map(p => p.respuesta)
    };

    console.log(`[EXAMEN] Usuario: ${user.cuenta} inició el examen`);

    //Enviar examen al front
    res.json({ examen });

    //Guardar fecha del intento
    user.intento = {
      fecha: new Date().toLocaleString(),
      examen,
      respuestasCorrectas: preguntasAleatorias.map(p => p.respuesta)
    };
};


//Recibir y calificar respuestas
exports.submitAnswers = (req, res) => {
  const cuenta = req.userCuenta;
  const user = users.find(u => u.cuenta === cuenta);

  if (!user.intento) {
    return res.status(400).json({ msg: "No has iniciado ningún examen." });
  }

  const { respuestas } = req.body;

  if (!respuestas || respuestas.length === 0) {
    return res.status(400).json({ msg: "No se recibieron respuestas." });
  }

  const correctas = user.intento.respuestasCorrectas;
  let aciertos = 0;

  respuestas.forEach((r, i) => {
    if (r === correctas[i]) aciertos++;
  });

  const calificacion = (aciertos / correctas.length) * 100;
  const aprobado = calificacion >= 70;

  user.aprobado = aprobado;

  console.log(`[RESULTADO] Usuario: ${user.cuenta} | Calificación: ${calificacion}%`);

  res.json({
    calificacion,
    aprobado,
    mensaje: aprobado
      ? "¡Felicidades! Has aprobado la certificación 🎉"
      : "No aprobaste, puedes intentarlo más adelante."
  });
};
