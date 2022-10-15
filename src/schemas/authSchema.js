import joi from 'joi';

const signInSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required
});

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export { signInSchema, loginSchema };