const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    nameOfTheCar: {
        type: String,
        required: true  
    },
    licensePlate: {
        type: String,
    },
    modelOfTheCar: {
        type: String,
        required: true
    },
    yearOfTheCar: {
        type: Number,
        required: true
    },
    color: {
        type: String,
    },
    description: {
        type: String,
    },
    photos: {
        type: [String]
    },
}, {
    timestamps: true,
});

const CarModel = mongoose.model('Car', CarSchema);

module.exports = CarModel;