const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const Admin = require('../models/Admin');

const crearUsuario = async (req, res = response) => {

    const { username, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ username });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese username'
            })
        }

        usuario = new Usuario(req.body);

        // Encriptar contrasenia
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            username: usuario.username
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error, favor comunicarse con el programador'
        })
    }

};

const loginUsuario = async(req, res = response) => {

    const { username, password } = req.body;

    try {

		const usuario = await Usuario.findOne({ username });

        if (!usuario) { 
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese username'
            });
        }

		// Confirmar los passwords
		const validPassword = bcrypt.compareSync( password, usuario.password);

		if (!validPassword){
			return res.status(400).json({
				ok: false,
				msg: 'Password incorrecto'
			})
		}

		res.json({
			ok: true,
			uid: usuario.id,
            name: usuario.name,
            username: usuario.username
		});


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor comunicarse con el administrador'
        })
    }

};

const crearAdmin = async (req, res = response) => {

    const { username, password } = req.body;

    try {
        let admin = await Admin.findOne({ username });

        if (admin) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un administrador con ese username'
            })
        }

        admin = new Admin(req.body);

        // Encriptar contrasenia
        const salt = bcrypt.genSaltSync();
        admin.password = bcrypt.hashSync(password, salt);

        await admin.save();

        res.status(201).json({
            ok: true,
            uid: admin.id,
            name: admin.name,
            username: admin.username
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error, favor comunicarse con el programador'
        })
    }

};

const loginAdmin = async(req, res = response) => {

    const { username, password } = req.body;

    try {

		const admin = await Admin.findOne({ username });

        if (!admin) { 
            return res.status(400).json({
                ok: false,
                msg: 'El administrador no existe con ese username'
            });
        }

		// Confirmar los passwords
		const validPassword = bcrypt.compareSync( password, admin.password);

		if (!validPassword){
			return res.status(400).json({
				ok: false,
				msg: 'Password incorrecto'
			})
		}

		res.json({
			ok: true,
			uid: admin.id,
            name: admin.name,
            username: admin.username
		});


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor comunicarse con el programador'
        })
    }

};

module.exports = {
    crearUsuario,
    loginUsuario,
    crearAdmin,
    loginAdmin
}