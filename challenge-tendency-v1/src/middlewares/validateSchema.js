

import { GeneralError } from '../utils/errors/generalError.js';
import { validator } from '../utils/validators/joi-validator.js';

export const validateSchema = (schema) => (req, res, next) => {
  try {
    req.body = validator(schema)(req.body);
    next();
  } catch (error) {
    
    // Aquí manejamos específicamente los errores de validación
    if (error instanceof GeneralError && error.code === 400) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        details: error
      });
    }
    // Si no es un error de validación, lo pasamos al siguiente middleware
    next(error);
  }
};

// export const validateSchema = (schema) => {

//   let joiValidator = (req, res, next) => {
//     let {error} =  schema.validate(req.body);
//     if (error) {
//       let {details} = error;
//       res.status(422).json({
//         error: details
//       })
//     } else {
//       next();
//     }

//   }
//   return joiValidator;
// }