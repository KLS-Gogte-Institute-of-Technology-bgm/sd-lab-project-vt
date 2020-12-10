const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    city: String,
    vehicle: String,
    queryType: String
})

module.exports = mongoose.model('User', userSchema);