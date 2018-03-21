const Joi = require('joi')

module.exports = (req, res, next) => {
    const toValidate = { email: req.body.email, code: req.body.code }
    const schema = Joi.object().keys({
        email: Joi.string().email().required().label('email'),
        code: Joi.string().length(20).required().label('code'),
    })
    return Joi.validate(toValidate, schema, (err) => next(err))
}
