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
      Profiles.belongsTo(models.Users , {as: 'User' , foreignKey: 'user_id'})
      Profiles.belongsTo(models.Roles , {as: 'Role' , foreignKey: 'role_id'})
     
    }
  }
  Profiles.init({
    userId: DataTypes.UUID ,
    roleId: DataTypes.UUID ,
    imageUrl: DataTypes.STRING,
    codePhone: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    countryId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Profiles',
    tableName: 'profiles', 
    timestamps: false 
  })
  return Profiles
}