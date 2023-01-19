'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
      votes.belongsTo(models.publications, {as: 'vote', foreignKey: 'publication_id'})
      votes.hasMany(models.Profiles, {as: 'profile', foreignKey: 'profile_id'})
      
    }
  }
  votes.init({
    publication_id: DataTypes.UUID,
    profile_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'votes',
  });
  return votes;
};