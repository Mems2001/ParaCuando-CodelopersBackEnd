'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Roles.hasMany(models.Profiles , {as: 'role' , foreignKey: 'role_id'})
    }
  }
  Roles.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles',
    tableName: 'roles' ,
    timestamps: true ,
    scopes: {
      no_timestamps: {
        attributes: {
          exclude: ['created_at' , 'updated_at']
        }
      }
    }
  })
  return Roles
}