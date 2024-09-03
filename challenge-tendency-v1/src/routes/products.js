import express from 'express';
import { catalogProductSchema } from '../schemas/index.js';
import { validator, validatorCombined } from '../utils/index.js';
// import {  validarJWT } from '../middlewares/index.js';
import { createProducts, getProducts } from '../controllers/products.js';
import { updateProducts } from '../controllers/products.js';
import { deleteProducts } from '../controllers/products.js';

const productsRouter = express.Router();

/**
 * GET/products
 */

productsRouter.get('/', getProducts);
// productsRouter.get('/',validator(catalogProductSchema), getProductsById  );

/**
 * POST/products
 */

productsRouter.post('/', validatorCombined(catalogProductSchema), createProducts);



/**
 * PUT/products
 */

productsRouter.put('/:id', validator(catalogProductSchema), updateProducts);

/**
 * DELETE/products
 */

productsRouter.delete('/:id', deleteProducts);

export default productsRouter;