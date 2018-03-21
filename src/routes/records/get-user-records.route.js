const db = require('../../data-layer/get-user-bloodRequests-by-id.db')

module.exports = (req, res, next) => {
    return db(req.params.id).then(x => res.status(200).json(x)).catch(err => next(err))
}