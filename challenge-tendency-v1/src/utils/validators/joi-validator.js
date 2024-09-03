import { GeneralError } from "../errors/generalError.js";

/**
 * 
 * @param {*} schema 
 * The validator is a function that takes a joi schema and returns a function that takes a 
 * payload(the data to be validated) and returns the result of the validation.
 * The property 'abortEarly' is used to return all errors at once
 */

export const validator = (schema) => (payload) => {
  const { error, value } = schema.validate(payload, { abortEarly: false });
  console.log("🚀 ~ validator ~ error:", error)
  if (error) {
    throw error;
  }
  return value;
};



