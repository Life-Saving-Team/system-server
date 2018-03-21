const { getToken } = require('../../core/authentication')
const comparePassword = require('../../services/compare-password').comparePassword
const getUserByEmail = require('../../data-layer/get-user-by-email')
const clearUnneededDataFromPayload = require('../../services/clear-unneeded-data')

module.exports = (req, res, next) => {
    let loginErr = new Error('Email or/and password are wrong')
    return getUserByEmail(req.body.email).then(user => {
        if (!user) return res.status(401).json({error: loginErr.message})
        if(!user.active) return res.status(403).json({error: "Your account is not activated yet"})
        return comparePassword(req.body.password, user.password).then(ok => {
            if (!ok) return res.status(401).json({error: loginErr.message})
            return res.send({ user: clearUnneededDataFromPayload(user), token: getToken(user._id, user.role) })
        }).catch(err => next(err))
    })
}


