/*
    Rutas para el manejo de clubes / Auth
    host + api/clubes
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

const { crearClub, marcarInteres } = require('../controllers/clubes');

router.post(
    '/new', 
    [ //Middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('category', 'El category es obligatorio').not().isEmpty(),
        check('suggestedBy', 'El suggestedBy es obligatorio').not().isEmpty(),
        check('interested', 'El interested es obligatorio').isArray(),
        validarCampos
    ], 
    crearClub
);

router.post(
    '/interest', 
    [
        check('clubName', 'El clubName es obligatorio').not().isEmpty(),
        check('userName', 'El username es obligatorio').not().isEmpty(),
        validarCampos
    ],
    marcarInteres 
);


module.exports = router;