'use strict'
const Countries = require('./countries')

const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class States extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      States.hasMany(models.Cities, {as: 'state', foreignKey: 'state_id'})
      States.belongsTo(models.Countries, {as: 'Country' , foreignKey: 'country_id'})
    }
  }
  States.init({
    name: DataTypes.STRING,
    country_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'States',
    tableName: 'states' ,
    timestamps: false ,
    defaultScope: {
      attributes: {
        exclude: ['country_id']
      }
    }
  })
  return States
}