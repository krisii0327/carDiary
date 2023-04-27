const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    },
    subject: {
        type: String,
        required: true,
    },
    typeOfService: {
        type: String,
        required: true
    },
    kilometer: {
        type: Number,
        required: true
    },
    costOfService: {
        type: Number,
        required: true
    },
    extraInfo: {
        type: String,
    },
    timeOfService: {
        type: Date,
    }
}, 
{
    timestamps: true,
});

const NoteModel = mongoose.model('Note', NoteSchema);

module.exports = NoteModel;