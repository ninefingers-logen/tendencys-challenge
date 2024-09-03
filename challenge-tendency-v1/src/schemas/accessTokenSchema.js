import Joi from "joi";

export const accessTokenSchema = Joi.object({
  user_id: Joi.string().strict().required().guid({ version: 'uuidv4' }),
  token: Joi.string().strict().required(),
})
