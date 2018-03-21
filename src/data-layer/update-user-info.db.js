const bloodRequestModel = require('../models/users.model')

module.exports = (_id, email, name) => {
    return bloodRequestModel.findOneAndUpdate({ _id }, { email, name }, { new: true })
}