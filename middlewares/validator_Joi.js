const Joi = require('joi')

const validator = (schema) => 
    (payload) => 
        schema.validate(payload, {abortEarly: false})
    

// everything withour .required() means is optional
const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required(),
    confirmPassword: Joi.ref("password"),
    address: {
        state: Joi.string().length(2).required(),
    },
    DOB: Joi.date().greater(new Date("2012-01-01")).required(),
    referred: Joi.boolean().required(),
    referralDetails: Joi.string().when('referred', {
        is: true,
        then: Joi.string().required().min(3).max(50),
        otherwise: Joi.string().optional()
    }),
    hobbies: Joi.array().items([Joi.string(), Joi.number()]), //only accept string or number
    acceptTos: Joi.boolean().truthy("Yes").valid(true) //the only valid value in this field is true, and if this fiels input is "Yes" then resolve it to true
})


exports.validateSignup = validator(signupSchema)

//Joi.String().equal(['M','F','FEMALE','MALE','DECLINE']).required()

/*
{
    "email": "101@hp.com",
    "password":"123",
    "confirmPassword":"123",
    "address": {
        "state": "LA"
    },
    "DOB": "2025-01-01"
}
    */