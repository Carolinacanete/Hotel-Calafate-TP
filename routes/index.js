const express = require('express');
const router = express.Router();
const { getResenas } = require('../models/resenasModel');

/* GET home page. */
router.get('/', async function (req, res, next) {

    let resenas = await getResenas();
    resenas = resenas.splice(0,3);
    res.render('index', {
        resenas
    });
});

module.exports = router;
