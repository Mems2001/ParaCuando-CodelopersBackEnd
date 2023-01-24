'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Profiles , {as:'user' , foreignKey:'user_id'})
    }
  }
  Users.init({
    firstName: DataTypes.STRING ,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    emailVerified: DataTypes.DATE,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users' ,
    timestamps: true ,
    defaultScope: {
      attributes: {
        exclude: ['password' , 'emailVerified' , 'token' , 'created_at' , 'updated_at']
      }
    } ,
    scopes: {
      admin: {
      }
    }
  })
  return Users
}