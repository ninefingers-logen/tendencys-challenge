import { AccessToken } from "../database/models/access_token.js";
import { User } from "../database/models/users.js";
import { JwtAdapter } from "../helpers/jwtAdapter.js";
import { scheduleJob } from "../helpers/scheduleAdapter.js";
import { GeneralError } from "../utils/errors/generalError.js";






export const list = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, products] = await Promise.all([
      CatalogProduct.count({ where: query }),  // Contando productos con Sequelize
      CatalogProduct.findAll({  // Buscando productos con Sequelize
          where: query,
          offset: Number(desde),
          limit: Number(limite)
      })
  ]);

  res.json({
      total,
      products
  });
}


export const createProducts = async (req, res = response) => {
  const { name, description, height, length, width } = req.body;

  // Crear y guardar el producto en la BD
  const product = await CatalogProduct.create({
      name,
      description,
      height,
      length,
      width
  });

  res.json({
      product
  });
}


export const updateProducts = async (req, res = response) => {
  const { id } = req.params;
  const { ...resto } = req.body;

  const [affectedCount, updatedProducts] = await CatalogProduct.update(resto, {
      where: { id },
      returning: true,  // Para obtener el objeto actualizado
      plain: true
  });

  res.json(updatedProducts); // Retorna el producto actualizado
}


export const deleteProducts = async (req, res = response) => {
  const { id } = req.params;

  const [affectedCount, updatedProducts] = await CatalogProduct.update({ estado: false }, {
      where: { id },
      returning: true,  // Para obtener el objeto actualizado
      plain: true
  });

  res.json(updatedProducts); // Retorna el producto actualizado
}
