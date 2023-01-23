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
      Profiles.hasMany(models.Votes, {as: 'vote', foreignKey: 'profile_id'})
      Profiles.hasMany(models.Publications, {as: 'profile' , foreignKey: 'profile_id'})
      Profiles.belongsTo(models.Countries, {as: 'Country' , foreignKey: 'country_id'})
    }
  }
  Profiles.init({
    user_id: DataTypes.UUID ,
    role_id: DataTypes.UUID ,
    imageUrl: DataTypes.STRING,
    codePhone: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    country_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Profiles',
    tableName: 'profiles', 
    timestamps: false ,
    defaultScope: {
      attributes: {
        exclude: ['user_id' , 'role_id' , 'country_id']
      }
    } ,
    scopes: {
      admin: {
        
      }
    }
  })
  return Profiles
}