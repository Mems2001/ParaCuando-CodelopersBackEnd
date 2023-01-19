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
          
      // publications.belongsTo(models.votes, {as: 'vote', foreignKey: 'city_id'})
      // publications.belongsTo(models.Profiles, {as: 'profile', foreignKey: 'profile_id'})
      // publications.belongsTo(models.publications_types, {as: 'publication_type', foreignKey: 'publication_type_id'})
      publications.hasMany(models.votes , {as: 'publication' , foreignKey: 'publication_id'})
    }
  }
  publications.init({
    profile_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        key: 'id' ,
        model: 'Profiles'
      } ,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    publication_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'id' ,
        model: 'publications_types'
      } ,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },  
    city_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        key: 'id' ,
        model: 'cities'
      } ,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },  
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },  
    content: {
      type: DataTypes.STRING,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false ,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    }
  }, {
    sequelize,
    modelName: 'publications',
  });
  return publications;
};