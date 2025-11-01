const users = [
  {
    id: 1,
    cuenta: "DulceAnd",
    contrasena: "9876",
    nombreCompleto: "Dulce Mariana Andrade Olvera",
    pago: false, //si el usuario ya pago el examen
    intento: false, //si ya presentó el examen ya que solo una vez permitido
    aprobado: false  //si aprobó el examen permite descargar certificado
  },
  {
    id: 2,
    cuenta: "LiaArteaga",
    contrasena: "1234",
    nombreCompleto: "Elia Guadalupe Arteaga Delgado",
    pago: false,
    intento: false,
    aprobado: false
  },
  {
    id: 3,
    cuenta: "ValeriRam",
    contrasena: "secreto",
    nombreCompleto: "Valeria Ramos López",
    pago: false,
    intento: false,
    aprobado: false
  },
  {
    id: 4,
    cuenta: "GinaGlez",
    contrasena: "contra",
    nombreCompleto: "Georgina Guadalupe Calzada González",
    pago: false,
    intento: false,
    aprobado: false
  },
  {
    id: 5,
    cuenta: "RoberMTZ",
    contrasena: "clavesegura",
    nombreCompleto: "Roberto Martínez Torres",
    pago: false,
    intento: false,
    aprobado: false
  },
  {
    id: 6,
    cuenta: "SofiRdz",
    contrasena: "secreto123",
    nombreCompleto: "Sofía Rodríguez Luna",
    pago: false,
    intento: false,
    aprobado: false
  }
];

module.exports = users;