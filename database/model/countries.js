'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Countries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Countries.belongsTo(models.Profiles, {as: 'profile', foreignKey: 'country_id'})
      Countries.belongsTo(models.States, {as: 'country', foreignKey: 'country_id'})
      Countries.hasMany(models.Profiles, {as: 'profile', foreignKey: 'country_id'})
      Countries.hasMany(models.States, {as: 'state', foreignKey: 'country_id'})
    }
  }
  Countries.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Countries',
    tableName: 'countries'
  });
  return Countries;
};