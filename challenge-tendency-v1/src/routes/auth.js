import express from 'express';
import { register } from '../controllers/auth.js';

// import { validarCampos } from '../middlewares/validar-campos';


/**
 * POST /auth
 */

const router = express.Router();

router.post('/', register);




export default router;