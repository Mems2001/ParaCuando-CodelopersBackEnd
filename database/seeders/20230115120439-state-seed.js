'use strict'
const uuid = require('uuid')
const {Op} = require('sequelize')
const { findCountryByName } = require('../../controllers/countries.controllers')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      const country = await findCountryByName('Ecuador')
      await queryInterface.bulkInsert('states' , [
        {
          id: uuid.v4() ,
          country_id: country.id ,
          name: 'Pichincha' ,
          created_at: new Date() ,
          updated_at: new Date()
        } ,
        {
          id: uuid.v4() ,
          country_id: country.id ,
          name: 'Azuay' ,
          created_at: new Date() ,
          updated_at: new Date()
        } ,
        {
          id: uuid.v4() ,
          country_id: country.id ,
          name: 'Guayas' ,
          created_at: new Date() ,
          updated_at: new Date()
        }
      ] , {transaction})

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.bulkDelete('states' , {
        name: {
          [Op.or] : ['Pichincha' , 'Azuay' , 'Guayas']
        }
      } , {transaction})

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
