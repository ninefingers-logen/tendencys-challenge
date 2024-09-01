import express from 'express';
import { register } from '../controllers/auth.js';

/**
 * POST /auth
 */

const router = express.Router();

router.post('/', register);




export default router;