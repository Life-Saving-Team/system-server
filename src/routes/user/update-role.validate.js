const Joi = require('joi')
const ROLES = require('../../config/rolesConstants')

module.exports =  (req, res, next) => {
    const schema = Joi.object().keys({
        role: Joi.string().valid(ROLES.reviewer, ROLES.executer, ROLES.receptionist).label('role'),
    })
    return Joi.validate(req.body, schema , (err) => next(err))
}