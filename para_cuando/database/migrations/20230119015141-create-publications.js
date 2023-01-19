'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
    await queryInterface.createTable('publications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profile_id: {
        type: Sequelize.UUID
      },
      publication_type_id: {
        type: Sequelize.INTEGER
      },
      city_id: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      image_url: {
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
        await queryInterface.dropTable('publications',{ transaction })
        await transaction.commit()
      } catch (error) {
        await transaction.rollback()
        throw error
      }
    }
}
