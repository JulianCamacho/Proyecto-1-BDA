const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: false
    }
});

module.exports = model('Usuario', UsuarioSchema);