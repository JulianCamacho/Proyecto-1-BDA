const { response } = require('express');
const Club = require('../models/Club');

const crearClub = async (req, res = response) => {

    const clubArray = req.body;

    const repeatedClubs = [];

    try {

        for(let clubElement of clubArray){
            let name = clubElement.name;

            let club = await Club.findOne({ name }, 'name category');

            if (club) {
                repeatedClubs.push(club);
            }
 
        }

        if(repeatedClubs.length == clubArray.length){
            return res.status(400).json({
                ok: false,
                msg: 'Todos los clubes son repetidos'
            });
        }

        const filtered = clubArray.filter(el => {
            return !repeatedClubs.find(element => {
                return element.name === el.name;
            });
        });
        
        await Club.insertMany(filtered);
        
        res.status(201).json({
            ok: true,
            clubesInsertados: filtered,
            clubesRepetidos: repeatedClubs
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

const getClubesSugeridosPorUsuario = async(req, res = response) => {
    const userName = req.params.user;

    try {
        const clubes = await Club.find({suggestedBy: userName}, 'name category suggestedBy').exec();

        res.status(200).json({
            ok: true,
            clubes
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error, favor comunicarse con el programador'
        });
    }
}

const getClubesInteresados = async(req, res = response) => {
    const userName = req.params.user;

    try {
        const clubes = await Club.find({interested: {$in: userName}}, 'name category suggestedBy').exec();

        res.status(200).json({
            ok: true,
            clubes
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error, favor comunicarse con el programador'
        });
    }
}

module.exports = {
    crearClub,
    marcarInteres,
    getClubesSugeridosPorUsuario,
    getClubesInteresados
}