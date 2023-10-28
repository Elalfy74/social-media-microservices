import * as Joi from 'joi';

export const validationSchema = Joi.object({
  BROKER_URL: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
  PORT: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),
});
