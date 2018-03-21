const saveRecoveryCodeToDb = require('../../data-layer/save-recovery-code.db')
const generateRandomCode = require('../../services/generate-random-code').generateRandomCode
const mailer = require('../../services/mailer')

module.exports = async (req, res, next) => {
    const code = generateRandomCode()
    try {
        const user = await saveRecoveryCodeToDb(req.body.email, code)
        if(!user) return next({nF: 'User'})
        await mailer.sendEmailWithCode(req.body.email, code)
        return res.send({ success: 'An email has probably been sent with your recovery code (if it already exists)' })
    } catch (e) {
        return next(e)
    }

}
