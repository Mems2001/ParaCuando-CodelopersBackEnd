'use strict'
const uuid = require('uuid')
const { findCountryByName } = require('../../controllers/countries.controllers')
const { findRoleByName } = require('../../controllers/roles.controllers')

const UsersControllers = require('../../controllers/users.controllers')
const usersController = new UsersControllers()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    
    try {
      const users = await usersController.findUsersByLastName('example')
      const admin = await usersController.findUsersByUserName('mems2001')
      const admin2 = await usersController.findUsersByUserName('pendingAdmin1')
      const admin3 = await usersController.findUsersByUserName('pendingAdmin2')
      const country = await findCountryByName('Ecuador')
      // console.log(country)
      users.push(admin)
      users.push(admin2)
      users.push(admin3)
      const rolePublic = await findRoleByName('public')
      const roleAdmin = await findRoleByName('admin')
      const users_ids = []
      const profiles = [
        {
          id: uuid.v4() ,
          user_id: admin.id ,
          role_id: roleAdmin.id ,
          phone: 999196035 ,
          country_id: country.id
        } ,
        {
          id: uuid.v4() , // Waitin for Ángel <---------
          user_id: admin2.id ,
          role_id: roleAdmin.id ,
          phone: 999196036 ,
          country_id: country.id 
        } ,
        {
          id: uuid.v4() , // Waitin for Josué <---------
          user_id: admin3.id ,
          role_id: roleAdmin.id ,
          phone: 999196037 ,
          country_id: country.id 
        } 
      ]
      
      for (let user of users) {
        const user_id = await user.dataValues.id
        // console.log(user)
        // console.log(user_id)
        users_ids.push(user_id)
      }
      // console.log(users_ids)
  
      for (let user_id of users_ids) {
        const profile = {
          id: uuid.v4() ,
          user_id,
          role_id: rolePublic.id,
          phone: 999999999 - users_ids.indexOf(user_id),
          country_id: country.id  
        }
        profiles.push(profile)
      }

      await queryInterface.bulkInsert('profiles', profiles , {transaction})

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
