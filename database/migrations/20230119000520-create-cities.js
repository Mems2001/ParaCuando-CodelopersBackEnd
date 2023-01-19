'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
    await queryInterface.createTable('cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      state_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id' ,
          model: 'states'
        },
      },
      name: {
        allowNull: false ,
        type: Sequelize.STRING
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
        await queryInterface.dropTable('cities',{ transaction })
        await transaction.commit()
      } catch (error) {
        await transaction.rollback()
        throw error
      }
    }
}
