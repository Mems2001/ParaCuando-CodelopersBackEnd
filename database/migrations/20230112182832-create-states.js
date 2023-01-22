'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
          await queryInterface.createTable('states', {
            id: {
              allowNull: false,
              //autoIncrement: true,
              defaultValue: Sequelize.UUIDV4,
              primaryKey: true,
              type: Sequelize.UUID
            },
            name: {
              type: Sequelize.STRING
            },
            countryId: {
              type: Sequelize.UUID,
              //allowNull: false,
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
              type: Sequelize.DATE,
              field: 'created_at'
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE,
              field: 'updated_at'
            }
          }, { transaction });

            await transaction.commit()
          } catch (error) {
            await transaction.rollback()
            throw error
      
          }
        },
        async down(queryInterface, Sequelize) {
          const transaction = await queryInterface.sequelize.transaction()
          try {
            await queryInterface.dropTable('states');
            await transaction.commit()
          } catch (error) {
            await transaction.rollback()
            throw error
        }
      }
    }      