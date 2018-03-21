const db = require('../../data-layer/update-user-info.db')


module.exports = (req, res, next) => {
    return db(req.params.id, req.body.email, req.body.name).then(user => res.status(200).json(user))
        .catch(err => next(err))
}
