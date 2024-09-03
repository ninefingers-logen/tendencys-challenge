
// models/CatalogProduct.js
import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../config.js';



export class CatalogProduct extends Model {}

CatalogProduct.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  length: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  width: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'CatalogProduct',
  tableName: 'catalog_products',
  timestamps: false
});
