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
    userId: {
      type: DataTypes.UUID ,
      allowNull: false ,
      field: 'user_id' ,
      references: {
        key: 'id' ,
        model: 'users'
      } ,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    } ,
    roleId: {
      type: DataTypes.UUID ,
      allowNull: false,
      field: 'role_id' ,
      references: {
        key: 'id' ,
        model: 'roles'
      },
      onUpdate: 'CASCADE' ,
      onDelete: 'CASCADE'
    } ,
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'image_url' ,
      validate: {
        isUrl: true
      }
    } ,
    codePhone: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'code_phone'
    } ,
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false
    } ,
    countryId: { // Waiting for Josué
      type: DataTypes.UUID,
      // allowNull: false,
      field: 'country_id'
      // Foreign key references pending
    }
  }, {
    sequelize,
    modelName: 'Profiles',
    tableName: 'profiles' , 
    timestamps: false 
  })
  return Profiles
}