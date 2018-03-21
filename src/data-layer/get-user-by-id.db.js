const userModel = require('../models/users.model')

module.exports = async (id) => {
    return userModel.findById(id).exec()
}