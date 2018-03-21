
const addNewUser = require('../../data-layer/add-new-user.db')
const generateRandomCode = require('../../services/generate-random-code').generateRandomCode
const ROLES = require('../../config/rolesConstants')
const clearUnneededDataFromPayload = require('../../services/clear-unneeded-data')
const mailer = require('../../services/mailer')


module.exports = async (req, res, next) => {
    const user = req.body
    user.activationCode = generateRandomCode()
    try{
        const addedUser = await addNewUser(user, ROLES.receptionist)
        await mailer.sendActivationCode(user.email, user.activationCode)
        return res.status(200).json(clearUnneededDataFromPayload(addedUser))
    } catch(e) {
        global.log.error(e)
        
        return next(e)
    }
    
}

