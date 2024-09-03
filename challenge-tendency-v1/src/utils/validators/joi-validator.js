import { GeneralError } from "../errors/generalError.js";
/**
 * 
 * @param {*} schema 
 *  Los validadores que se crean  son funciones que toma un esquema joi y devuelve una función que toma el 
 *  payload(los datos a validar entrantes en la petición) y devuelve el resultado de la validación.
 *  La configuración de la propiedad 'abortEarly' se utiliza para devolver todos los errores a la vez
 */


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export const validator = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return next(GeneralError.badRequest('Validation error', errorMessages));
    }

    req.validatedData = value;
    next();
  };
};


export const validatorBulk = (schema) => {
  return (req, res, next) => {
    const products = req.body;

    if (!Array.isArray(products))
      return next(GeneralError.badRequest('Invalid input: expected an array of objects'));

    const errors = [];
    const validProducts = [];

    products.forEach((product, index) => {
      const { error, value } = schema.validate(product, { abortEarly: false });

      if (error) {
        errors.push({
          index,
          errors: error.details.map(detail => detail.message)
        });
      } else {
        validProducts.push(value);
      }
    });

    if (errors.length > 0)
      return next(GeneralError.badRequest('Validation errors in bulk operation', errors));


    // Si no hay errores, adjuntamos los productos validados al objeto req
    req.validProducts = validProducts;
    next();
  };
};

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

/**
 * 
 * @param {*} schema 
 * @returns 
 * 
 * Esta función combina los dos validadores en uno solo. 
 * El validador simple se encarga de validar el objeto individual y el validador bulk se encarga de validar el array de objetos
 */

export const validatorCombined = (schema) => {
  const singleValidator = validator(schema);
  const bulkValidator = validatorBulk(schema);

  return (req, res, next) => {
    const input = req.body;

    if (Array.isArray(input)) {

      // Si es un array, usamos el validador de bulk
      return bulkValidator(req, res, next);

    } else if (typeof input === 'object' && input !== null) {

      // Si es un objeto individual, usamos el validador simple
      return singleValidator(req, res, next);
    } else {

      // Si no es ni array ni objeto, devolvemos un error
      return next(GeneralError.badRequest('Validation errors in bulk operation', errors));
    }
  };
};