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
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          key: 'id' ,
          model: 'Profiles'
        },
      },
      publication_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id' ,
          model: 'publications_types'
        },
      },
      city_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          key: 'id' ,
          model: 'cities'
        },
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isUrl: true
        }
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isUrl: true
        }
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
        await queryInterface.dropTable('publications',{ transaction })
        await transaction.commit()
      } catch (error) {
        await transaction.rollback()
        throw error
      }
    }
}
