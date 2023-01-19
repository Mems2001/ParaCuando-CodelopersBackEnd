'use strict'
const uuid = require('uuid')
const {Op} = require('sequelize')
const { hashPassword } = require('../../utils/cypto')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const usersSeeds = [
      {
        id: uuid.v4() ,
        first_name: 'Mario' ,
        last_name: 'Muso' ,
        email: 'mems2001code@gmail.com' ,
        user_name: 'mems2001' ,
        password: hashPassword('root')
      } ,
      {
        id: uuid.v4() , // Waiting for Ángel <-------------
        first_name: 'Ángel' ,
        last_name: 'Carrasco' ,
        email: 'pending1@gmail.com' ,
        user_name: 'pendingAdmin1' ,
        password: hashPassword('root')
      } ,
      {
        id: uuid.v4(), // Waiting for Josué <--------------
        first_name: 'Josué' ,
        last_name: 'Ventura' ,
        email: 'pending2@gmail.com' ,
        user_name: 'pendingAdmin2' ,
        password: hashPassword('root')
      } 
    ]

    for (let i=1; i<21 ; i++) {
      const newSeed = {
        id: uuid.v4() ,
        first_name: `${i} name` ,
        last_name: 'example' ,
        email: `${i}@example.com` ,
        user_name: `${i}Example` ,
        password: hashPassword(`${i}Example`)
      }
      usersSeeds.push(newSeed)
    }

    try {
      await queryInterface.bulkInsert('users' , usersSeeds , {transaction})

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const userNames = ['mems2001' , 'pendingAdmin1' , 'pendingAdmin2'] 

    for (let i=1; i<21 ; i++) {
      const user_name = `${i}Example` 
      userNames.push(user_name)
    }
    try {
      await queryInterface.bulkDelete('users' , {
        user_name: {
          [Op.or]: userNames
        }
      } , {transaction})

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
