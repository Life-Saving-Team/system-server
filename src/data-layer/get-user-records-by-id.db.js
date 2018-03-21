const bloodRequestModel = require('../models/users.model')

module.exports = (id) => {
    return bloodRequestModel.findById(id).select('_id name email timeZones role').lean().populate('timeZones').exec()
}