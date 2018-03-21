const setActiveTrue = require('../../data-layer/set-user-active-true.db')

module.exports = (req, res, next) => {
    return setActiveTrue(req.params.id).then(user => user ? res.status(200).json(user) : next({nF:'User'}))
        .catch(err => next(err))
}

