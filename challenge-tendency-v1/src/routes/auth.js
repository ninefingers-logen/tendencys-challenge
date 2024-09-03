import express from 'express';
import { register } from '../controllers/auth.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { registerUserSchema } from '../schemas/registerSchema.js';

const authRouter = express.Router();


/**
 * POST /auth
 * This route is used to register a new user
 */

authRouter.post('/', validateSchema(registerUserSchema), register);


export default authRouter;