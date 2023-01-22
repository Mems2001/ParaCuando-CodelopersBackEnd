'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Publications_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Publications_types.belongsTo(models.Publications, { as: 'publication_type', foreignKey: 'publication_type_id' })
      Publications_types.hasMany(models.Publications, {as: 'publication' ,foreignKey: 'publication_type_id'})
    }
  }
  Publications_types.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Publications_types',
    tableName: 'publications_types'
  })
  return Publications_types
}