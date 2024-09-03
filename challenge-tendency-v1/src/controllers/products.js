import { request, response } from 'express';

// TODO: ESTAS HACIENDO LOS CONTROLADORES Y SERVICIOS DE PRODUCTOS, LUEGO DE ESO TERMINAS

export const getProducts = async (req, res = response, next) => {

    try {
        const productsDto = GetProductsDto.create(req.body);
        list(productsDto)
            .then((user) => res.json(user))
            .catch((error) => next(error));


    } catch (error) {
        next(GeneralError.internalServer('Error al registrar usuario', error));
    }
}



export const createProducts = async (req, res = response, next) => {
    try {
        const createProductDto = CreateProductDto.create(req.body);
        createProductService(createProductDto)
            .then((product) => res.status(201).json(product))
            .catch((error) => next(error));
    } catch (error) {
        next(GeneralError.internalServer('Error al crear producto', error));
    }
}

export const updateProducts = async (req, res = response, next) => {
    try {
        const { id } = req.params;
        const updateProductDto = UpdateProductDto.create({ ...req.body, id });
        updateProductService(updateProductDto)
            .then((product) => {
                if (product) {
                    res.json(product);
                } else {
                    next(GeneralError.notFound('Producto no encontrado', `No se encontró el producto con id ${id}`));
                }
            })
            .catch((error) => next(error));
    } catch (error) {
        next(GeneralError.internalServer('Error al actualizar producto', error));
    }
}

export const deleteProducts = async (req, res = response, next) => {
    try {
        const { id } = req.params;
        const deleteProductDto = DeleteProductDto.create({ id });
        deleteProductService(deleteProductDto)
            .then((result) => {
                if (result) {
                    res.status(204).send();
                } else {
                    next(GeneralError.notFound('Producto no encontrado', `No se encontró el producto con id ${id}`));
                }
            })
            .catch((error) => next(error));
    } catch (error) {
        next(GeneralError.internalServer('Error al eliminar producto', error));
    }
}