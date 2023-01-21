'use strict'
const {Op} = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.bulkInsert('states' , [
        {
          id: 1 ,
          country_id: 1 ,
          name: 'Pichincha' ,
          createdAt: new Date() ,
          updatedAt: new Date()
        } ,
        {
          id: 2 ,
          country_id: 1 ,
          name: 'Azuay' ,
          createdAt: new Date() ,
          updatedAt: new Date()
        } ,
        {
          id: 3 ,
          country_id: 1 ,
          name: 'Guayas' ,
          createdAt: new Date() ,
          updatedAt: new Date()
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
