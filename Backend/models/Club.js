const { Schema, model } = require('mongoose');

const ClubSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
    },
    suggestedBy: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true
	},
    interested: {
        type: [String],
        required: true
    },
});

module.exports = model('Club', ClubSchema);