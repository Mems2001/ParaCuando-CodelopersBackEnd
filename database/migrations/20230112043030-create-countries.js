'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {  
        await queryInterface.createTable('countries', {
          id: {
            allowNull: false,
            //autoIncrement: true,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'created_at'
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'uptated_at'
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
                    await queryInterface.dropTable('countries');
                    
                    await transaction.commit()
                  } catch (error) {
                    await transaction.rollback()
                    throw error
            }
      }
};