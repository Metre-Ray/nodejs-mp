import Joi from 'joi';
import PasswordValidator from 'password-validator';

const userCreateSchema = Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.number().integer().min(4).max(130).required(),
});

const userUpdateSchema = userCreateSchema.fork(['login', 'password', 'age'], (field) => field.optional());

const passwordSchema = new PasswordValidator();
passwordSchema
    .has().digits(1)
    .has().letters(1)
    .has().not().spaces()

export { userCreateSchema, userUpdateSchema, passwordSchema };
