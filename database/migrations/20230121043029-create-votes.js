'use strict'

const publications = require('../model/publications')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('votes', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID
        },
        publicationId: {
          type: Sequelize.UUID,
          allowNull: false,
          field: 'publication_id',
          references: {
            key: 'id',
            model: 'publications'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        profileId: {
          type: Sequelize.UUID,
          allowNull: false,
          field: 'profile_id',
          references: {
            key: 'id',
            model: 'profiles'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'created_at'
              
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'updated_at'
              
        }
      }, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    
    }

  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('votes')
                
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
           