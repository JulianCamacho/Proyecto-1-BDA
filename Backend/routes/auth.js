/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

const { crearUsuario, loginUsuario, crearAdmin, loginAdmin } = require('../controllers/auth')

router.post(
    '/newUser', 
    [ //Middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('username', 'El username es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser de 6 caracteres').isLength( { min:4 } ),
        validarCampos
    ], 
    crearUsuario
);

router.post(
    '/user', 
    [
        check('username', 'El username es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser de 6 caracteres').isLength( { min:4 } ),
        validarCampos
    ],
    loginUsuario 
);

router.post(
    '/newAdmin', 
    [ //Middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('username', 'El username es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser de 6 caracteres').isLength( { min:4 } ),
        validarCampos
    ], 
    crearAdmin
);

router.post(
    '/admin', 
    [
        check('username', 'El username es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser de 6 caracteres').isLength( { min:4 } ),
        validarCampos
    ],
    loginAdmin 
);


module.exports = router;
