import express from 'express';
import { register } from '../controllers/auth.js';
import { registerUserSchema } from '../schemas/registerSchema.js';
import { validator } from '../utils/index.js';
const authRouter = express.Router();


/**
 * POST /auth
 * This route is used to register a new user
 */

authRouter.post('/', validator(registerUserSchema), register);


export default authRouter;