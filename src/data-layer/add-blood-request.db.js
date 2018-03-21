const bloodRequestModel = require('../models/users.model')

module.exports = (userId, newTimeZone) => {
    return bloodRequestModel.findOneAndUpdate(
        { _id: userId },
        { $push: { timeZones: newTimeZone } },
        { new: true })
}

module.exports = (payload, role) => {
    const bloodRequest = new bloodRequestModel(payload)
    newUser.timeZones = []
    newUser.role = role
    return newUser.save()
}