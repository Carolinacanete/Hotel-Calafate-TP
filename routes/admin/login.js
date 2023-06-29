const express = require('express');
const router = express.Router();
const { getByUsernameAndPassword } = require('./../../models/usuariosModel');

router.get('/', function (req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout',
    });
});

router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.render('admin/login', {
        layout: 'admin/layout'
    })
})

router.post('/', async (req, res, next) => {

    try {
        const usuario = req.body.usuario;
        const password = req.body.password;

        const data = await getByUsernameAndPassword(usuario, password);

        if (data != undefined) {
            req.session.id_usuario = data.id;
            req.session.nombre = data.usuario;

            res.redirect('/admin/resenas');

        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            });
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
