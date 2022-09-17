/*
    Rutas para el manejo de clubes / Auth
    host + api/clubes
*/
const { Router } = require('express');
const { check, body } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

const { crearClub, marcarInteres, getClubesSugeridosPorUsuario, getClubesInteresados, getClubesPorCategoria, getTop5ClubesSugeridos, getBottom3ClubesSugeridos, getTop3EstudiantesMasSugerencias } = require('../controllers/clubes');

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

router.get('/byCategory', getClubesPorCategoria);

router.get('/top5', getTop5ClubesSugeridos);

router.get('/bottom3', getBottom3ClubesSugeridos);

router.get('/students/top3', getTop3EstudiantesMasSugerencias);

module.exports = router;