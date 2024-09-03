import { AccessToken } from "../database/models/access_token.js";
import { User } from "../database/models/users.js";
import { CatalogProduct } from "../database/models/catalog_products.js";
import { JwtAdapter } from "../helpers/jwtAdapter.js";
import { scheduleJob } from "../helpers/scheduleAdapter.js";
import { GeneralError } from "../utils/errors/generalError.js";






export const listService = async ({ limit = 5, offset = 0 }) => {

  try {
    const [total, products] = await Promise.all([
      CatalogProduct.count(),
      CatalogProduct.findAll({
        offset: offset,
        limit: limit
      })
    ]);

    return {
      total,
      products
    }
  } catch (error) {

    if (error instanceof GeneralError) {
      throw error;
    } else if (error.name === 'SequelizeConnectionError') {
      throw GeneralError.internalServer('Error de conexión con la base de datos', error);
    } else {
      throw GeneralError.internalServer('Error al listar productos', error);
    }
  }
};



export const createProductService = async (data) => {
  try {
    // Crear y guardar el producto en la base de datos
    const newProduct = await CatalogProduct.create(data);
    return newProduct;
  } catch (error) {
    // Lanzar un error general si ocurre un problema
    throw GeneralError.internalServer('Failed to create product', 'Database error');
  }
};

export const updateProductsService = async (id, data) => {
  try {
    const product = await CatalogProduct.findByPk(id);

    if (product === null)
      return  GeneralError.notFound('Product not found - update');
    // Primero, actualiza el producto en la base de datos
    const [updatedCount] = await CatalogProduct.update(data, {
      where: { id }
    });

    if (updatedCount === 0)
      throw GeneralError.notFound('Product not found-update');


    // Luego, recupera el producto actualizado
    const updatedProduct = await CatalogProduct.findByPk(id);
    if (!updatedProduct)
      throw GeneralError.notFound('Product not found after update');

    return updatedProduct;  // Retorna el producto actualizado

  } catch (error) {
    throw next(GeneralError.internalServer('Failed to update product', error.message));
  }
};

export const deleteProductsService = async (id) => {

  const product = await CatalogProduct.findByPk(id);

  if (product === null)
    throw GeneralError.notFound('Product not found');

  await CatalogProduct.destroy({
    where: { id }
  });

  console.log('aaaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa');
  const remainingProducts = await CatalogProduct.findAll();
  return remainingProducts;


}
