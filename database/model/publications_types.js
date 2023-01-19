'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class publications_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      publications_types.belongsTo(models.publications, {as: 'publication_type', foreignKey: 'publication_id'})
      publications_types.hasMany(models.publications, {as: 'publication', foreignKey: 'publication_type_id'})
    }
  }
  publications_types.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'publications_types',
  });
  return publications_types;
};