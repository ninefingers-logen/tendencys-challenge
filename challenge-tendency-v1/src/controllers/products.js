import { request, response } from 'express';
import { CatalogProduct } from '../database/models/catalog_products.js';
import { GeneralError } from '../utils/errors/generalError.js';

export const getProducts = async (req = request, res = response, next) => {
    try {

        // Esto es para paginar los datos
        const { limit = 5, offset = 0 } = req.query;

        const [total, products] = await Promise.all([
            CatalogProduct.count(),
            CatalogProduct.findAll({
                offset: Number(offset),
                limit: Number(limit)
            })
        ]);

        return res.json({
            total,
            products
        })
    } catch (error) {
        next(error);
    }
}
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::



export const createProducts = async (req, res, next) => {
    try {
        const input = req.body;
        let createdProducts;
        
        if (Array.isArray(input)) {
            // Creacion de multiples productos
            createdProducts = await CatalogProduct.bulkCreate(req.validProducts);
        } else {
            // Creacion de un solo producto
            createdProducts = await CatalogProduct.create(input);
        }
        
        res.status(201).json(createdProducts);
    } catch (error) {
        next(error);
    }
};
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


export const createProductsBatch = async (req = request, res = response, next) => {
    
    const data = req.body
    
    try {
        
        if (!Array.isArray(data))
            return next(GeneralError.badRequest('data must be an array'));
        
        const newProduct = await CatalogProduct.bulkCreate(data);
        return res.json(newProduct);
    }
    
    catch (error) {
        return next(GeneralError.internalServer('Failed to create product', error));
    }
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export const updateProducts = async (req = request, res = response, next) => {
    const { id } = req.params;
    const data = req.body
    
    try {
        
        // 1. Buscar el producto
        // 2. Si no existe, pasa el error al siguiente middleware
        const product = await CatalogProduct.findByPk(id);
        if (product === null)
            return next(GeneralError.notFound('Product not found'));
        
        // 3. Actualizar el proyecto
        await CatalogProduct.update(data, { where: { id } });
        const updatedProduct = await CatalogProduct.findByPk(id);
        
        return res.json(updatedProduct);
        
    } catch (error) {
        return next(GeneralError.internalServer('Failed to update product', error.message));
    }
}
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export const deleteProducts = async (req, res, next) => {
    const { id } = req.params;
    try {
        // 1. Buscar el producto
        // 2. Si no existe, pasa el error al siguiente middleware
        
        const product = await CatalogProduct.findByPk(id);
        if (!product)
            return next(GeneralError.notFound('Product not found'));
        
        
        
        // 3. Eliminar el producto
        await CatalogProduct.destroy({ where: { id } });
        
        // 4. Obtener los productos restantes
        const remainingProducts = await CatalogProduct.findAll();
        return res.json({ remainingProducts });
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

