const patientModel = require('../models/patient.model')


module.exports = (payload, role) => {
    const newUser = new patientModel(payload)
    newUser.timeZones = []
    newUser.role = role
    return newUser.save()
}