import { GeneralError } from '../utils/errors/generalError.js';

export const errorHandler = (err, req, res, next) => {
  console.error(`### ERROR: ${err.message}`);

  if (err instanceof GeneralError) {
    return res.status(err.code).json({
      status: 'error',
      message: err.message,
      cause: err.cause
    });
  }

  if (err.isJoi) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation errorrrrr',
      details: err.details.map(detail => detail.message) 
    });
  }

  // Para cualquir otro tipos de error
  return res.status(500).json({
    status: 'error aqui mierda',
    message: 'Internal Server Error'
  });
};