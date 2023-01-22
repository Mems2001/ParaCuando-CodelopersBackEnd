'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('users', {
        id: { 
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID  
        },
        firstName: {
          allowNull: false,
          type: Sequelize.STRING,
          field: 'first_name',
          validate: {
            min: 3
          }
        } ,
        lastName: {
          allowNull: false,
          type: Sequelize.STRING,
          field: 'last_name' ,
          validate: {
            min: 3
          }
        } ,
        userName: {
          allowNull: false ,
          unique: true,
          type: Sequelize.STRING,
          field: 'user_name',
          validate: {
            min: 3
          }
        } ,
        email: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING,
          validate: {
            isEmail: true
          }
        } ,
        password: {
          allowNull: false,
          type: Sequelize.STRING
        },
        emailVerified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false ,
          field: 'email_verified' 
        } ,
        token: {
          type: Sequelize.STRING
        } ,
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'created_at',
          defaultValue: new Date()
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'updated_at',
          defaultValue: new Date()
        }
      }  , { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('users',{ transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}