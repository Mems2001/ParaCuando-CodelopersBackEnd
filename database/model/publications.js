'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class publications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      
      
      publications.hasMany(models.cities, {as: 'city', foreignKey: 'publication_id'})
      publications.belongsTo(models.Profiles, {as: 'profile', foreignKey: 'profile_id'})
      
      
    }
  }
  publications.init({
    profile_id: DataTypes.UUID,
    publication_type_id: DataTypes.INTEGER,
    city_id: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.STRING,
    picture: DataTypes.STRING,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'publications',
  });
  return publications;
};