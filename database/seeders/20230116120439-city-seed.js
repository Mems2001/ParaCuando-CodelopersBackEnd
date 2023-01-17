'use strict'
const uuid = require('uuid')
const {Op} = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.bulkInsert('cities' , [
        {
          id: uuid.v4() ,
          countryId: '',  // Waiting for Josué
          name: 'X'
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
      await queryInterface.bulkDelete('cities' , {
        name: {
          [Op.or]: ['X']
        }
      } , {transaction})

      await transaction.commit()
    } catch (error) {
      await transaction.rollback() 
      throw error
    }
  }
}
