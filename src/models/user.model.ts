import { Joi } from "celebrate";

export type User = {
    id: string;
    nome: string;
    email: string;
    password?: string;
};

export const newUserShema = Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

export const updateUserShema = Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6)
});

export const authLoginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

export const authRecoverySchema = Joi.object().keys({
    email: Joi.string().email().required()
});