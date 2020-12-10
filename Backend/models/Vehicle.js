const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    brand: String,
    model: String,
    kmDriven: String,
    owners: String,
    papers: String,
    insurance: String,
    accident: String,
    type: String,
    images: [String],
    price: String
})

module.exports = mongoose.model('Vehicle', vehicleSchema)