const bloodRequestModel = require('../models/Patients.model')
const ROLES = require('../config/rolesConstants')

module.exports = {
    getAllPatients({ limit, skip, sortByValue, filter, searchBy }) {
        let query = {}
        if (filter) {
            query[searchBy] = { $regex: RegExp(`.*${filter}.*`) }
        }
        let sortObj = {}
        sortObj[sortByValue] = sortByValue
        return bloodRequestModel.find(query).limit(limit).skip(skip).sort({dateOfNeed: -1}).select('_id name email role active').lean().exec()
    },
    
    
    // getAllPatientsCount(filter) {
    //     const query = filter ? { name: { $regex: RegExp(`.*${filter}.*`) } } : {}
    //     return bloodRequestModel.find(query).count().lean().exec()
    // },

    // getRegularPatients({ limit, skip, filter }) {
    //     const query = filter ? { role: ROLES.receptionist, name: { $regex: RegExp(`.*${filter}.*`) } } : { role: ROLES.receptionist}
    //     return bloodRequestModel.find(query).limit(limit).skip(skip).select('_id name email active').lean().exec()
    // },

    // getRegularPatientsCount(filter) {
    //     const query = filter ? { role: ROLES.receptionist, name: { $regex: RegExp(`.*${filter}.*`) } } : { role: ROLES.receptionist}
    //     return bloodRequestModel.find(query).count().lean().exec()
    // },
}
