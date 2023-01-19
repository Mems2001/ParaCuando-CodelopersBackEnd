'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      cities.hasMany(models.publications, {as: 'city', foreignKey: 'city_id'})
      
      cities.belongsTo(models.states, {as: 'state', foreignKey: 'state_id'})
    }
  }
  cities.init({
    state_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cities',
  });
  return cities;
};