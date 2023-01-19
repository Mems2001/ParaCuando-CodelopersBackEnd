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
          id: 1 ,
          state_id: 1,  // Waiting for Josué
          name: 'Quito',
          createdAt: new Date() ,
          updatedAt: new Date()
        } ,
        {
          id: 2 ,
          state_id: 2 ,
          name: 'Cuenca',
          createdAt: new Date() ,
          updatedAt: new Date()
        } ,
        {
          id: 3 ,
          state_id: 3 ,
          name: 'Guayaquil',
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
      await queryInterface.bulkDelete('cities' , {
        name: {
          [Op.or]: ['Quito' , 'Cuenca' , 'Guayaquil']
        }
      } , {transaction})

      await transaction.commit()
    } catch (error) {
      await transaction.rollback() 
      throw error
    }
  }
}