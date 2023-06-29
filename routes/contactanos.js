const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', function (req, res, next) {
    res.render("contactanos")
})


router.post('/', async (req, res, next) => {

    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var email = req.body.email;
    var mensaje = req.body.mensaje;

    var obj = {
        to: "canetecarolina94@gmail.com",
        subject: "Contacto desde la web",
        html: nombre + " " + apellido + " necesita mas informacion sobre el Hotel Fuerte Calafate en el correo " + email + ". <br> Ademas dejo el siguiente mensaje: " + mensaje
    }

    var transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })

    await transporter.sendMail(obj);

    res.render("contactanos", {
        mensaje: "Mensaje enviado"
    })
})

module.exports = router;