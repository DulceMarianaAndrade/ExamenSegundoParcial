const PDFDocument = require('pdfkit');
const users = require('../data/users');

const generateCertificate = (req, res) => {
    try {
        //Extraer del usuario autenticado
        const cuenta = req.userCuenta; //Esto viene del middleware authRequired
        
        //Buscar usuario en la base de datos
        const user = users.find(u => u.cuenta === cuenta);

        //VERIFICAR QUE EL USUARIO ESTÉ APROBADO
        if (!user.aprobado) {
            return res.status(403).json({ 
                error: 'Usuario no aprobado. No puede generar certificado' 
            });
        }

        // Usar datos del usuario autenticado
        const studentName = user.nombreCompleto;
        const date = new Date().toLocaleDateString();

        // Crear documento PDF
        const doc = new PDFDocument({
            layout: 'landscape',
            size: 'A4'
        });

        // Headers para descarga de PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 
            `attachment; filename="certificado-${studentName.replace(/\s+/g, '-')}.pdf"`);

        doc.pipe(res);

        // === DISEÑO DEL CERTIFICADO ===
        // Fondo
        doc.rect(0, 0, doc.page.width, doc.page.height).fill('#f8f9fa');
        
        // Borde decorativo
        doc.strokeColor('#2c5aa0')
            .lineWidth(15)
            .roundedRect(30, 30, doc.page.width - 60, doc.page.height - 60, 10)
            .stroke();

        // Título principal
        doc.fontSize(28)
            .fillColor('#2c5aa0')
            .font('Helvetica-Bold')
            .text('CERTIFICATE OF COMPETENCE', 0, 100, { align: 'center' });

        // Texto descriptivo
        doc.fontSize(16)
            .fillColor('#333333')
            .font('Helvetica')
            .text('For accurately passing the examination to be recognized as a', 0, 160, { align: 'center' });

        // Especialidad
        doc.fontSize(22)
            .fillColor('#2c5aa0')
            .font('Helvetica-Bold')
            .text('Certified Junior Angular Developer', 0, 200, { align: 'center' });

        // Nombre del estudiante (del usuario autenticado)
        doc.fontSize(24)
            .fillColor('#d4af37')
            .font('Helvetica-Bold')
            .text(studentName.toUpperCase(), 0, 280, { align: 'center' });
        
        // Mensaje de motivación
        doc.fontSize(14)
            .fillColor('#666666')
            .font('Helvetica-Oblique')
            .text('Going for Senior Team', 0, 380, { align: 'center' });

        // Fecha actual
        doc.fontSize(12)
            .fillColor('#888888')
            .text(`Date: ${date}`, 0, 450, { align: 'center' });

        // Línea de firma
        doc.moveTo(doc.page.width / 2 - 100, 500)
            .lineTo(doc.page.width / 2 + 100, 500)
            .strokeColor('#333333')
            .lineWidth(1)
            .stroke();

        doc.fontSize(10)
            .fillColor('#666666')
            .text('Authorized Signature', 0, 510, { align: 'center' });

        doc.end();

    } catch (error) {
        console.error('Error generating certificate:', error);
        res.status(500).json({ 
            error: 'Error interno al generar el certificado' 
        });
    }
};

module.exports = { generateCertificate };