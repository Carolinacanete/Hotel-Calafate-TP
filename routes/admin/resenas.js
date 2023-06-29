const express = require('express');
const router = express.Router();
const { getResenas, createResena, updateResenaById, deleteResenaById } = require('./../../models/resenasModel');

router.get('/', async function (req, res, next) {
    const resenas = await getResenas();

    res.render('admin/resenas', {
        layout: 'admin/layout',
        resenas
    });
});

router.post('/create', async function (req, res, next) {
    try {
        await createResena(req.body);
        res.redirect('/admin/resenas');
    } catch (error) {
        console.log(error);
    }
});

router.post('/update/:id', async function (req, res, next) {
    try {
        let resenaId = req.params.id;
        await updateResenaById(req.body, resenaId);
        res.redirect('/admin/resenas');
    } catch (error) {
        console.log(error);
    }
});

router.get('/delete/:id', async function (req, res, next) {
    try {
        let resenaId = req.params.id;
        await deleteResenaById(resenaId);
        res.redirect('/admin/resenas');
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
