'use strict'
const uuid = require('uuid')
const {Op} = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.bulkInsert('publication_types' , [
        {
          id: uuid.v4() ,
          name: 'event' ,
          description: '' ,
          createdAt: new Date() ,
          updatedAt: new Date()
        } ,
        {
          id: 2 ,
          name: 'concert' ,
          description: '' ,
          createdAt: new Date() ,
          updatedAt: new Date()
        } ,
        {
          id: 3 ,
          name: 'tournament' ,
          description: '' ,
          createdAt: new Date() ,
          updatedAt: new Date()
        } ,
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
      await queryInterface.bulkDelete('publication_types' , {
        name: {
          [Op.or] : ['event' , 'concert' , 'tournament']
        }
      } , {transaction})

      await transaction.commit()
    } catch(error) {
      await transaction.rollback()
      throw error
    }
  }
}
