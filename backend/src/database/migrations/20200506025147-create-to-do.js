'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('to_do_items', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      to_do_list_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'to_do_lists',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      text: Sequelize.STRING(140),
      checked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('to_do_items')
  }
}
