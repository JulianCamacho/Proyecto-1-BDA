const { response } = require('express');
const Club = require('../models/Club');

const crearClub = async (req, res = response) => {

    const { name } = req.body;

    try {
        let club = await Club.findOne({ name });

        if (club) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un club con ese nombre'
            })
        }

        club = new Club(req.body);

        await club.save();

        res.status(201).json({
            ok: true,
            uid: club.id,
            name: club.name
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error, favor comunicarse con el programador'
        })
    }

};

const marcarInteres = async(req, res = response) => {

    const { clubName, userName } = req.body;

    try {

		const club = await Club.findOne({ clubName });

        if (!club) { 
            return res.status(400).json({
                ok: false,
                msg: 'No existe un club con ese nombre'
            });
        }

        if(club.interested.includes(userName)){
            return res.status(400).json({
                ok: false,
                msg: 'Ya se marco como interesado'
            });
        }

        let newInterested = [...club.interested, userName];

		let updatedClub = await Club.findOneAndUpdate({name: clubName}, {interested: newInterested}, {new: true});

        res.status(201).json({
            ok: true,
            uid: updatedClub.id,
            name: updatedClub.name,
            interested: updatedClub.interested
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor comunicarse con el administrador'
        })
    }

};


module.exports = {
    crearClub,
    marcarInteres
}