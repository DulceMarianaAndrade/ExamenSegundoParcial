const express = require("express");
const authRoutes = require("./routes/auth.routes");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const examenRoutes = require("./routes/examen.routes");
const certificateRoutes = require("./routes/certificate.routes");
const pagoRoutes = require("./routes/pago.routes");
const contactoRoutes = require("./routes/contacto.routes");

// Middlewares
app.use(express.json());

const ALLOWED_ORIGINS = [
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:5501',
  'http://127.0.0.1:5501'
];

// Configuración CORS mejorada
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS: ' + origin));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true, //Permitir credenciales
    optionsSuccessStatus: 200
  })
);

// Manejar preflight requests
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(200);
  }
  next();
});


// Montar rutas bajo /api
app.use("/api/auth", authRoutes);
app.use("/api/examen", examenRoutes);
app.use("/api/certificate", certificateRoutes);
app.use("/api/pago", pagoRoutes);
app.use("/api/contacto", contactoRoutes);

// Ruta de salud
app.get("/health", (_req, res) => res.json({ ok: true }));

// Ruta de verificación de token (si no existe)
app.get("/api/auth/verify", (req, res) => {
  res.status(404).json({ error: "Ruta no implementada" });
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});