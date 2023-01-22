'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class States extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      States.belongsTo(models.Cities, {as: 'state', foreignKey: 'state_id'})
    }
  }
  States.init({
    name: DataTypes.STRING,
    countryId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'States',
    tableName: 'states'
  });
  return States;
};