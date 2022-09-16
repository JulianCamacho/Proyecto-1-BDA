/*
    Rutas para el manejo de clubes / Auth
    host + api/clubes
*/
const { Router } = require('express');
const { check, body } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

const { crearClub, marcarInteres, getClubesSugeridosPorUsuario, getClubesInteresados } = require('../controllers/clubes');

router.post(
    '/new', 
    [ //Middlewares
        body().isArray(),
        body('*.name', 'El nombre es obligatorio').not().isEmpty(),
        body('*.category', 'El category es obligatorio').not().isEmpty(),
        body('*.suggestedBy', 'El suggestedBy es obligatorio').not().isEmpty(),
        body('*.interested', 'El interested es obligatorio').isArray(),
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

router.get('/suggested/:user', getClubesSugeridosPorUsuario);

router.get('/interested/:user', getClubesInteresados);


module.exports = router;