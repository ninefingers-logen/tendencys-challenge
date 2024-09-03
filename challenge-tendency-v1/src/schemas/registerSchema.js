import Joi from "joi";

export const registerUserSchema = Joi.object({
  name: Joi.string().required().regex(/^[a-zA-Z\s]*$/,'only letters and spaces'),
  phone: Joi.string().required(),
  img_profile: Joi.string().required(),
});