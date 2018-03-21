const bloodRequestModel = require('../models/users.model')

module.exports = (id) => {
    return bloodRequestModel.findById(id).select('password').exec()
}