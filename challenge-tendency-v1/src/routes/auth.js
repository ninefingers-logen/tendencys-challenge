import express from 'express';
import { register } from '../controllers/auth.js';
import { registerUserSchema } from '../schemas/registerSchema.js';
import { validatorCombined } from '../utils/validators/joi-validator.js';
const authRouter = express.Router();


/**
 * POST /auth
 * Aqui se registra un nuevo usuario
 * Se usa el middleware validatorCombined para validar tanto un user asi como un array de users
 */

authRouter.post('/', validatorCombined(registerUserSchema), register);


export default authRouter;