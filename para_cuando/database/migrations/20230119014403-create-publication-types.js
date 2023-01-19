'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
    await queryInterface.createTable('publications_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {transaction} )

    await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
    down: async (queryInterface, Sequelize) => {
      const transaction = await queryInterface.sequelize.transaction()
      try {
        await queryInterface.dropTable('publications_types',{ transaction })
        await transaction.commit()
      } catch (error) {
        await transaction.rollback()
        throw error
      }
    }
}
