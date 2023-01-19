'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class states extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      states.belongsTo(models.cities, {as: 'state', foreignKey: 'state_id'})
      states.hasMany(models.cities, {as: 'city', foreignKey: 'cities_id'})
    }
  }
  states.init({
    country_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'states',
  });
  return states;
};