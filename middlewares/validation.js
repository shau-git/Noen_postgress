const Joi = require('joi')

const userSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    //age: Joi.number().integer().min(0).optional()
    //id: Joi.number().integer().required()
})

module.exports = userSchema



