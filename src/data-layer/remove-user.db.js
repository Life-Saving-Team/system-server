const bloodRequestModel = require('../models/users.model')

module.exports = (id) =>  {
    return bloodRequestModel.findByIdAndRemove(id)
}