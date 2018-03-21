
const getUserById = require('../../data-layer/get-user-by-id.db')


module.exports = async (req, res, next) => {
    const user = await getUserById(req.params.id).catch(e => next(e))
    if(!user) return next({nF: 'User'})
    user.password = req.body.newPassword
    await user.save().catch(e => next(e))
    return res.json({ success: 'User password has changed successfully' })
}






