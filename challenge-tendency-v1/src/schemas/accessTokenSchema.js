import Joi from "joi";

export const accessTokenSchema = Joi.object({
  user_id: Joi.string().required().guid({ version: 'uuidv4' }),
  token: Joi.string().required(),
  created_at: Joi.date().required(),
})
