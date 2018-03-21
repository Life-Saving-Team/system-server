const addbloodRequest = require('../../data-layer/add-bloodRequest.db')


module.exports = (req, res, next) => {
    return addbloodRequest(req.params.id, req.body).catch(err => next(err)).then(user => res.status(200).json(user))
}
