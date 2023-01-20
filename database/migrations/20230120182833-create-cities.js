'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
        await queryInterface.createTable('cities', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false
          },
          stateId: {
            type: Sequelize.INTEGER
          },
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
            await queryInterface.dropTable('Cities');

            await transaction.commit()
          } catch (error) {
            await transaction.rollback()
            throw error
          }
      }
    };