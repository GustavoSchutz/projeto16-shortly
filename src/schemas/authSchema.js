import joi from 'joi';

const signInSchema = joi.object({
    name: joi.string().min(1).required().messages({
        'string.base': `"nome" deve ser do tipo 'texto'`,
        'string.empty': `"nome" não pode ser vazio`,
        'any.required': `"nome" deve ser preenchido`
    }),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required
});

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export { signInSchema, loginSchema };