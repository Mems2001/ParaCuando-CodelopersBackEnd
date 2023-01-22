'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Publications.belongsTo(models.Profiles , {as: 'publication' , foreignKey: 'publication_id'})
      Publications.hasMany(models.Profiles, {as: 'profile' ,foreignKey: 'publication_id'})
      Publications.hasMany(models.Cities, {as: 'city', foreignKey: 'city_id'})
      Publications.hasMany(models.Votes, {as: 'vote', foreignKey: 'publication_id'})
    }
  }
  Publications.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.TEXT,
    picture: DataTypes.STRING,
    image_url: DataTypes.STRING,
    profileId: DataTypes.UUID,
    publicationTypeId: DataTypes.UUID,
    cityId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Publications',
    tableName: 'publications'
  });
  return Publications;
};