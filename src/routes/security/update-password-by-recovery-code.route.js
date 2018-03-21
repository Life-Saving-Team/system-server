const getUserByEmail = require('../../data-layer/get-user-by-email')

module.exports = async (req, res, next) => {
    const user = await getUserByEmail(req.body.email).catch(err => next(err))
    if (!user) return next({ nF: 'User' })
    if (user.recoveryCode !== req.body.recoveryCode) return res.status(400).send({ error: 'Wrong recovery code' })
    else user.password = req.body.newPassword
    await user.save().catch(e => next(e))
    return res.status(200).json({ success: 'Your password has been updated successfully' })
}
