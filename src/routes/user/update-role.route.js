const db = require('../../data-layer/update-role.db')

module.exports = (req, res, next) => {
    return db(req.params.id, req.body.role).then(user => user ? res.status(200).json(user) : next({nF:'User'}))
        .catch(err => next(err))
}

