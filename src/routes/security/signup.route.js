
const addNewUser = require('../../data-layer/add-new-user.db')
const ROLES = require('../../config/rolesConstants')
const clearUnneededDataFromPayload = require('../../services/clear-unneeded-data')


module.exports = (req, res, next) => {
    const user = req.body
    user.active = true
    return addNewUser(user, ROLES.receptionist).then(user => {
        return res.status(200).json(clearUnneededDataFromPayload(user))
    }).catch(e => next(e))
}



