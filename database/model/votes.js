'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Votes.belongsTo(models.Publications, {as: 'publication', foreignKey: 'publication_id'})
      Votes.belongsTo(models.Profiles, {as: 'profile', foreignKey: 'profile_id'})
    }
  }
  Votes.init({
    publicationId: DataTypes.UUID,
    profileId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Votes',
    tableName: 'votes'
  });
  return Votes;
};