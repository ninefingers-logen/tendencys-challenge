import Joi from "joi";

export const catalogProductSchema = Joi.object({
  name: Joi.string().strict().required(),
  description: Joi.string().strict().required(),
  height: Joi.number().strict().required(),
  length: Joi.number().strict().required(),
  width: Joi.number().strict().required(),
});
