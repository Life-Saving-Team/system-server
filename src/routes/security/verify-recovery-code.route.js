
const getUserByEmail = require('../../data-layer/get-user-by-email')

module.exports = async (req, res, next) => {
    try {
        const user = await getUserByEmail(req.body.email)
        if (!user){
            return next({ nF: 'User' })
        } else if (user.recoveryCode !== req.body.code) {
            return res.status(403).send({ error: 'Corrupt link' })
        } else {
            user.recoveryCode = undefined
            user.active = true
            await user.save()
            return res.status(200).send({ success: 'Please submit new password' })
        }
    } catch (e) {
        return next(e)
    }


}