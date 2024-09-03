import Joi from "joi";

export const catalogProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  height: Joi.number().required(),
  length: Joi.number().required(),
  width: Joi.number().required(),
});
