const Joi = require('joi')

module.exports =  (req, res, next) => {
    const schema = Joi.object().keys({
        gmtTimeDifference: Joi.number().min(-12).max(14).required().label('gmt time difference'),
        name: Joi.string().required().label('name'),
        city: Joi.string().required().label('city'),
    })
    return Joi.validate(req.body, schema , (err) => next(err))
}