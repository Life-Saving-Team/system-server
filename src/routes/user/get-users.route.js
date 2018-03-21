const ROLES = require('../../config/rolesConstants')
const db = require('../../data-layer/get-users.db')

module.exports = (req, res, next) => {
    let promise
    const query = { limit: 10, skip: parseInt(req.query.skip), filter: req.query.filter }
    if (req.decoded.role === ROLES.executer) {
        promise = Promise.all([db.getRegularUsers(query), db.getRegularUsersCount(req.query.filter)])
    } else {
        promise = Promise.all([db.getAllUsers(query), db.getAllUsersCount(req.query.filter)])
    }
    return promise.then(([users, count]) => res.status(200).json({ users, count })).catch(err => next(err))
}