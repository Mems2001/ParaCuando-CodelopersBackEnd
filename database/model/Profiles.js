'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profiles.belongsTo(models.Users , {as: 'profileU' , foreignKey: 'user_id'})
      Profiles.belongsTo(models.Roles , {as: 'profileR' , foreignKey: 'role_id'})
    }
  }
  Profiles.init({
    id: {
      type: DataTypes.UUID ,
      primaryKey: true
    } ,
    userId: DataTypes.UUID ,
    roleId: DataTypes.UUID ,
    imageUrl: DataTypes.UUID ,
    codePhone: DataTypes.INTEGER ,
    phone: DataTypes.INTEGER ,
    countryId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Profiles',
    tableName: 'profiles' , 
    timestamps: true ,
    scopes: {
      no_timestamps: {
        attributes: {
          exclude: ['created_at' , 'updated_at']
        }
      }
    }
  })
  return Profiles
}