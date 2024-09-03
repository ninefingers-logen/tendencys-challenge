
// models/AccessToken.js
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config.js';

import { User } from './users.js';

export class AccessToken extends Model { }

AccessToken.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'AccessToken',
  tableName: 'access_tokens',
  timestamps: false
});

AccessToken.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });