const joi = require('joi');

const authSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).max(15).required()
});

module.exports = authSchema;