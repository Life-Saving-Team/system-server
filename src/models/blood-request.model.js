const mongoose = require('mongoose')
const bloodRequestSchema = require('./blood-request.schema')

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);