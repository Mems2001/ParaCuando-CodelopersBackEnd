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
    firstName: {
      type: DataTypes.STRING ,
      allowNull: false ,
      field: 'first_name' ,
      validate: {
        min: 3
      }
    } ,
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'last_name' ,
      validate: {
        min: 3
      }
    } ,
    userName: {
      allowNull: false ,
      unique: true,
      type: DataTypes.STRING,
      field: 'user_name',
      validate: {
        min: 3
      }
    } ,
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    } ,
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    // emailVerified: {
    //   type: DataTypes.DATE,
    //   field: 'email_verified'
    // } ,
    // token: {
    //   type: DataTypes.STRING
    // } ,
    // createdAt: {
    //   allowNull: false,
    //   type: DataTypes.DATE,
    //   field: 'created_at',
    //   defaultValue: new Date()
    // },
    // updatedAt: {
    //   allowNull: false,
    //   type: DataTypes.DATE,
    //   field: 'updated_at',
    //   defaultValue: new Date()
    // }
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users' ,
    timestamps: false
  })
  return Users
}