const Joi = require('joi')


export const SharedValidation = {
    phoneNumber: Joi.number().min(11).max(11).required().label('phone number'),
}
