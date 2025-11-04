const PDFDocument = require("pdfkit");
const users = require("../data/users");
const fs = require("fs");
const path = require("path");

const logoPath = path.join(__dirname, "../imagenes/logo.png");
const firma1Path = path.join(__dirname, "../imagenes/firma1.png");
const firma2Path = path.join(__dirname, "../imagenes/firma2.png");

const generateCertificate = (req, res) => {
  try {
    const cuenta = req.userCuenta;
    const user = users.find(u => u.cuenta === cuenta);

    if (!user?.aprobado) {
      return res.status(403).json({ error: "Usuario no aprobado. No puede generar certificado" });
    }

    const studentName = user.nombreCompleto;
    const date = new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Crear documento PDF
    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margins: { top: 40, bottom: 40, left: 50, right: 50 },
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="certificado-${studentName.replace(/\s+/g, "-")}.pdf"`
    );

    doc.pipe(res);

    // Fondo claro
    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fefefe");

    // Agregar logo
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 70, 40, { width: 100 });
    } else {
      console.warn("⚠️ Logo no encontrado en:", logoPath);
    }

    // Marco dorado
    doc.lineWidth(6)
      .strokeColor("#d4af37")
      .roundedRect(20, 20, doc.page.width - 40, doc.page.height - 40, 15)
      .stroke();

    // Marco azul interior
    doc.lineWidth(3)
      .strokeColor("#1e4fa1")
      .roundedRect(35, 35, doc.page.width - 70, doc.page.height - 70, 10)
      .stroke();

    const centerX = doc.page.width / 2;

    // Título principal
    doc.font("Helvetica-Bold")
      .fontSize(36)
      .fillColor("#1e4fa1")
      .text("CERTIFICADO", 0, 100, { align: "center" });

    // Subtítulo decorativo
    doc.moveTo(centerX - 120, 140)
      .lineTo(centerX + 120, 140)
      .strokeColor("#d4af37")
      .lineWidth(2)
      .stroke();

    doc.font("Helvetica")
      .fontSize(16)
      .fillColor("#555")
      .text("Se otorga el presente certificado a", 0, 170, { align: "center" });

    // Nombre del estudiante
    doc.font("Helvetica-Bold")
      .fontSize(28)
      .fillColor("#1e4fa1")
      .text(studentName.toUpperCase(), 0, 205, { align: "center" });

    // Programa
    doc.font("Helvetica")
      .fontSize(14)
      .fillColor("#555")
      .text("Por haber completado exitosamente el programa de certificación en", 0, 250, { align: "center" });

    doc.font("Helvetica-Bold")
      .fontSize(20)
      .fillColor("#d4af37")
      .text("Certificación Profesional en Desarrollo Java", 0, 280, { align: "center" });

    // Texto final
    doc.font("Helvetica-Oblique")
      .fontSize(12)
      .fillColor("#777")
      .text("Reconocimiento por demostrar excelencia técnica y compromiso con el aprendizaje", 0, 315, { align: "center" });

    // Información inferior
    const infoY = 370;
    const certId = `CERT-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    doc.font("Helvetica-Bold").fontSize(10).fillColor("#444")
      .text("FECHA DEL EXAMEN:", 100, infoY)
      .font("Helvetica").text(date, 100, infoY + 15);

    doc.font("Helvetica-Bold")
      .text("CIUDAD:", centerX - 50, infoY)
      .font("Helvetica")
      .text("Aguascalientes, México", centerX - 50, infoY + 15);

    doc.font("Helvetica-Bold")
      .text("ID DEL CERTIFICADO:", doc.page.width - 230, infoY)
      .font("Helvetica")
      .text(certId, doc.page.width - 230, infoY + 15);

    // Firmas
    const lineY = 450;

    // Firma 1
    if (fs.existsSync(firma1Path)) {
      doc.image(firma1Path, 130, lineY - 45, { width: 100 }); // imagen sobre la línea
    }
    doc.moveTo(120, lineY).lineTo(240, lineY).strokeColor("#444").stroke();
    doc.fontSize(10).fillColor("#444")
      .text("Georgina Salazar Partida", 120, lineY + 5)
      .fontSize(9).text("Instructora Certificada", 120, lineY + 18);

    // Firma 2
    if (fs.existsSync(firma2Path)) {
      doc.image(firma2Path, doc.page.width - 230, lineY - 45, { width: 100 }); // imagen sobre la línea
    }
    doc.moveTo(doc.page.width - 240, lineY).lineTo(doc.page.width - 120, lineY).stroke();
    doc.fontSize(10).fillColor("#444")
      .text("Dulce Mariana Andrade Olvera", doc.page.width - 240, lineY + 5)
      .fontSize(9).text("Directora General - ProgramaCert", doc.page.width - 240, lineY + 18);

    // Finalizar PDF
    doc.end();

  } catch (error) {
    console.error("Error al generar certificado:", error);
    res.status(500).json({ error: "Error interno al generar el certificado" });
  }
};

module.exports = { generateCertificate };
