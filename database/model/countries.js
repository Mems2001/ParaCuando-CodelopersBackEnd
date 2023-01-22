'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Countries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Countries.belongsTo(models.Profiles, {as: 'Country', foreignKey: 'country_id'})
      Countries.belongsTo(models.States, {as: 'country', foreignKey: 'country_id'}) // No es cierto que Countries "pertenezca a" States, los países no pertenencen a los estados, sino que los estados pertenecen a los países, esta relación no va.
      Countries.hasMany(models.Profiles, {as: 'country', foreignKey: 'country_id'}) //Countries no puede tener con Profiles la relación "hasMany" y "belongsTo" a la vez, en este caso "hasMany" es la correcta.
      Countries.hasMany(models.States, {as: 'country', foreignKey: 'country_id'}) //Countries no puede tener con States la relación "hasMany" y "belongsTo" a la vez.
    }
  }
  Countries.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Countries',
    tableName: 'countries'
  })
  return Countries
}