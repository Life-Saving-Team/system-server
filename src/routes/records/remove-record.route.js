const removebloodRequest = require('../../data-layer/remove-bloodRequest.db')

module.exports = (req, res, next) => {
    return removebloodRequest(req.params.id, req.params.timeZoneId)
    .then(update=> update ?  res.status(200).json(update) : next({nF: 'timezone'}))
    .catch(err=>next(err))
}