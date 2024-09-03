import express from 'express';
import { catalogProductSchema } from '../schemas/index.js';
import { validator, validatorCombined } from '../utils/validators/joi-validator.js';
import { createProducts, getProducts, updateProducts, deleteProducts } from '../controllers/products.js';
import { authMiddleware } from '../middlewares/validar-jwt.js';

// authMiddleware

const productsRouter = express.Router();

/**
 * GET/products
 */

productsRouter.get('/', authMiddleware, getProducts);

/**
 * POST/products
 */

productsRouter.post('/', [authMiddleware, validatorCombined(catalogProductSchema)], createProducts);



/**
 * PUT/products
 */

productsRouter.put('/:id', [authMiddleware, validator(catalogProductSchema)], updateProducts);

/**
 * DELETE/products
 */

productsRouter.delete('/:id', [authMiddleware], deleteProducts);

export default productsRouter;