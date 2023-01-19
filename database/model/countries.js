'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class countries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      countries.belongsTo(models.states, {as: 'country', foreignKey: 'country_id'})
      countries.hasMany(models.Profiles, {as: 'country', foreignKey: 'country_id'})
      
    }
  }
  countries.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'countries',
  });
  return countries;
};