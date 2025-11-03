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
        return res.status(403).json({ msg: "Sólo se tiene una oportunidad para realizar el examen." });
    }

    //Seleccionar 8 preguntas aleatorias no repetidas
    const preguntasAleatorias = mezclar([...preguntas]).slice(0, 8);

    //Mezclar las opciones de respuestas de cada pregunta
    const examen = preguntasAleatorias.map(p => ({
        id: p.id,
        texto: p.texto,
        opciones: mezclar([...p.opciones]),
        respuestaCorrecta: p.respuesta
    }));

    // ✅ CORREGIDO: Guardar en propiedad temporal para no perder respuestasCorrectasMap
    user.examenEnCurso = {
        fecha: new Date().toLocaleString(),
        examen: examen.map(p => ({
            id: p.id,
            texto: p.texto,
            opciones: p.opciones
        })),
        respuestasCorrectasMap: examen.reduce((map, pregunta) => {
            map[pregunta.id] = pregunta.respuestaCorrecta;
            return map;
        }, {})
    };

    console.log(`[EXAMEN] Usuario: ${user.cuenta} inició el examen`);
    console.log(`[EXAMEN] Preguntas asignadas:`, examen.map(p => p.id));
    console.log(`[EXAMEN] Respuestas correctas:`, user.examenEnCurso.respuestasCorrectasMap);

    //Enviar examen al front
    res.json({ 
        examen: user.examenEnCurso.examen 
    });
};

//Recibir y calificar respuestas (CORREGIDO)
exports.submitAnswers = (req, res) => {
    const cuenta = req.userCuenta;
    const user = users.find(u => u.cuenta === cuenta);

    // ✅ CORREGIDO: Verificar examenEnCurso en lugar de intento
    if (!user || !user.examenEnCurso) {
        return res.status(400).json({ msg: "No has iniciado ningún examen." });
    }

    const { respuestas } = req.body;

    if (!respuestas || !Array.isArray(respuestas) || respuestas.length === 0) {
        return res.status(400).json({ msg: "No se recibieron respuestas válidas." });
    }

    console.log(`[CALIFICACIÓN] Usuario: ${user.cuenta}`);
    console.log(`[CALIFICACIÓN] Respuestas recibidas:`, JSON.stringify(respuestas, null, 2));
    console.log(`[CALIFICACIÓN] Respuestas correctas:`, user.examenEnCurso.respuestasCorrectasMap);

    const respuestasCorrectasMap = user.examenEnCurso.respuestasCorrectasMap;
    let aciertos = 0;
    let detalles = [];

    // Calificar cada respuesta
    respuestas.forEach(respuestaUsuario => {
        const preguntaId = respuestaUsuario.preguntaId;
        const respuestaUsuarioValor = respuestaUsuario.respuesta;
        const respuestaCorrecta = respuestasCorrectasMap[preguntaId];

        console.log(`[CALIFICACIÓN] Pregunta ${preguntaId}:`);
        console.log(`  - Usuario: "${respuestaUsuarioValor}"`);
        console.log(`  - Correcta: "${respuestaCorrecta}"`);
        console.log(`  - Coincide: ${respuestaUsuarioValor === respuestaCorrecta}`);

        if (respuestaCorrecta && respuestaUsuarioValor === respuestaCorrecta) {
            aciertos++;
            detalles.push({ 
                preguntaId, 
                correcta: true,
                respuestaUsuario: respuestaUsuarioValor,
                respuestaCorrecta: respuestaCorrecta
            });
        } else {
            detalles.push({ 
                preguntaId, 
                correcta: false, 
                respuestaUsuario: respuestaUsuarioValor,
                respuestaCorrecta: respuestaCorrecta 
            });
        }
    });

    const totalPreguntas = Object.keys(respuestasCorrectasMap).length;
    const calificacion = totalPreguntas > 0 ? (aciertos / totalPreguntas) * 100 : 0;
    const aprobado = calificacion >= 70;

    // ✅ CORREGIDO: Actualizar estado del usuario SIN perder respuestasCorrectasMap
    user.aprobado = aprobado;
    user.intento = true; // Marcar que ya realizó el intento
    
    // Guardar detalles del resultado
    user.resultadoExamen = {
        fecha: new Date().toLocaleString(),
        calificacion: calificacion,
        aciertos: aciertos,
        totalPreguntas: totalPreguntas,
        detalles: detalles,
        aprobado: aprobado
    };

    // Limpiar examen en curso (ya no lo necesitamos)
    user.examenEnCurso = null;

    console.log(`[RESULTADO] Usuario: ${user.cuenta}`);
    console.log(`[RESULTADO] Aciertos: ${aciertos}/${totalPreguntas}`);
    console.log(`[RESULTADO] Calificación: ${calificacion}%`);
    console.log(`[RESULTADO] Aprobado: ${aprobado}`);
    console.log(`[ESTADO USUARIO] user.aprobado = ${user.aprobado}, user.intento = ${user.intento}`);

    res.json({
        aciertos: aciertos,
        totalPreguntas: totalPreguntas,
        calificacion: Math.round(calificacion * 100) / 100,
        aprobado: aprobado,
        score: calificacion,
        detalles: detalles,
        mensaje: aprobado
            ? "¡Felicidades! Has aprobado la certificación 🎉"
            : `No aprobaste. Obtuviste ${aciertos}/${totalPreguntas} aciertos (${Math.round(calificacion)}%).`
    });
};