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
    description: String,
    price: String,
    registrationNo: String,
    isLive: Boolean
})

module.exports = mongoose.model('Vehicle', vehicleSchema)