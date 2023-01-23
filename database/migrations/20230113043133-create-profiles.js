'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async(queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable('profiles', {
        id: {
          type: Sequelize.UUID ,
          allowNull: false,
          primaryKey: true
        },
        userId: {
          type: Sequelize.UUID ,
          allowNull: false ,
          references: {
            key: 'id' ,
            model: 'users'
          } ,
          field: 'user_id' ,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        } ,
        roleId: {
          type: Sequelize.UUID ,
          allowNull: false,
          field: 'role_id' ,
          references: {
            key: 'id' ,
            model: 'roles'
          },
          onUpdate: 'CASCADE' ,
          onDelete: 'CASCADE'
        } ,
        imageUrl: {
          type: Sequelize.STRING,
          allowNull: true,
          field: 'image_url' ,
          validate: {
            isUrl: true
          }
        } ,
        codePhone: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: 'code_phone'
        } ,
        phone: {
          type: Sequelize.INTEGER,
          allowNull: false
        } ,
        countryId: { 
          type: Sequelize.UUID,
          allowNull: false,
          field: 'country_id',
          references: {
            key: 'id',
            model: 'countries'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE ,
          field: 'created_at' ,
          defaultValue: new Date()
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'updated_at' ,
          defaultValue: new Date()
        }
      } , {transaction})

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  
  down: async(queryInterface , Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.dropTable('profiles' , {transaction})

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}