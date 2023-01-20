'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
        await queryInterface.createTable('publications', {
          id: {
            allowNull: false,
         // autoIncrement: true,
            defaultValue: Sequelize.UUID,
            primaryKey: true,
            type: Sequelize.UUID
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false
          },
          description: {
            type: Sequelize.STRING
          },
          content: {
            type: Sequelize.TEXT
          },
          picture: {
            type: Sequelize.STRING
          },
          image_url: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              isUrl: true
            }
          },
          profileId: {
            type: Sequelize.UUID,
            allowNull: false,
            field: 'profile_id',
            foreignKey: true,
            
            references: {
              key: 'id',
              model: 'profiles'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
           /*{ publicationTypeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'publication_type_id',
            foreignKey: true,
            
            references: {
              key: 'id',
              model: 'publications_types' // en revision
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }, }*/
            cityId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'city_id',
            foreignKey: true,
            
            references: {
              key: 'id',
              model: 'cities'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'created_at' ,
              defaultValue: new Date()
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'updated_at' ,
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
          await queryInterface.dropTable('publications', { transaction });

          await transaction.commit()
        } catch (error) {
          await transaction.rollback()
          throw error
        }
      }
}

   