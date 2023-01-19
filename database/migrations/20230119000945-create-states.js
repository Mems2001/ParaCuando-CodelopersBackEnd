'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
try {
    await queryInterface.createTable('states', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      country_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id' ,
          model: 'countries'
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
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
        await queryInterface.dropTable('states',{ transaction })
        await transaction.commit()
      } catch (error) {
        await transaction.rollback()
        throw error
      }
    }
}