const preguntas = [
  {
    id: 1,
    texto: "¿Qué tipo de lenguaje es JavaScript?",
    opciones: ["Compilado", "Interpretado", "De máquina", "Binario"],
    respuesta: "Interpretado"
  },
  {
    id: 2,
    texto: "¿Qué palabra clave se usa para declarar una variable que puede cambiar su valor?",
    opciones: ["const", "let", "define", "varname"],
    respuesta: "let"
  },
  {
    id: 3,
    texto: "¿Qué método convierte una cadena JSON en un objeto JavaScript?",
    opciones: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"],
    respuesta: "JSON.parse()"
  },
  {
    id: 4,
    texto: "¿Cuál es el resultado de typeof null en JavaScript?",
    opciones: ["null", "undefined", "object", "number"],
    respuesta: "object"
  },
  {
    id: 5,
    texto: "¿Cómo se escribe un comentario de una sola línea en JavaScript?",
    opciones: ["/* comentario */", "// comentario", "<!-- comentario -->", "# comentario"],
    respuesta: "// comentario"
  },
  {
    id: 6,
    texto: "¿Qué símbolo se usa para concatenar cadenas en JavaScript?",
    opciones: ["+", "&", "*", "%"],
    respuesta: "+"
  },
  {
    id: 7,
    texto: "¿Cuál de los siguientes es un tipo de dato primitivo en JavaScript?",
    opciones: ["Number", "Array", "Object", "Function"],
    respuesta: "Number"
  },
  {
    id: 8,
    texto: "¿Qué método muestra un mensaje en la consola del navegador?",
    opciones: ["console.print()", "console.log()", "alert()", "print()"],
    respuesta: "console.log()"
  },
  {
    id: 9,
    texto: "¿Qué estructura se usa para repetir un bloque de código varias veces?",
    opciones: ["if", "loop", "for", "case"],
    respuesta: "for"
  },
  {
    id: 10,
    texto: "¿Qué palabra clave detiene un ciclo for antes de que termine?",
    opciones: ["exit", "stop", "break", "end"],
    respuesta: "break"
  },
  {
    id: 11,
    texto: "¿Qué operador se usa para comparar valor y tipo en JavaScript?",
    opciones: ["==", "===", "=", "!="],
    respuesta: "==="
  },
  {
    id: 12,
    texto: "¿Cómo se define una función llamada saludar en JavaScript?",
    opciones: ["function saludar() {}", "def saludar() {}", "func saludar() {}", "method saludar() {}"],
    respuesta: "function saludar() {}"
  },
  {
    id: 13,
    texto: "¿Qué objeto global se usa para trabajar con fechas en JavaScript?",
    opciones: ["Calendar", "Date", "Time", "Clock"],
    respuesta: "Date"
  },
  {
    id: 14,
    texto: "¿Qué devuelve la expresión Boolean(0)?",
    opciones: ["true", "false", "undefined", "null"],
    respuesta: "false"
  },
  {
    id: 15,
    texto: "¿Qué estructura condicional se usa para múltiples casos posibles?",
    opciones: ["if", "for", "switch", "else if"],
    respuesta: "switch"
  },
  {
    id: 16,
    texto: "¿Qué operador lógico representa 'Y' (AND) en JavaScript?",
    opciones: ["||", "&&", "&", "##"],
    respuesta: "&&"
  }
];

module.exports = preguntas;
