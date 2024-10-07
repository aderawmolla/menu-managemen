'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Create the Menus table
    await queryInterface.createTable('Menus', {
      id: {
        type: Sequelize.UUID, // Use UUID type for unique identifiers
        primaryKey: true,     // This is the primary key
        defaultValue: Sequelize.UUIDV4, // Automatically generate a new UUID
        allowNull: false,     // Cannot be null
      },
      depth: {
        type: Sequelize.INTEGER, // Use INTEGER for depth
        allowNull: false,        // Cannot be null
        defaultValue: 0,         // Default value for depth
      },
      name: {
        type: Sequelize.STRING,  // Use STRING for name
        allowNull: false,        // Cannot be null
      },
      parentId: {
        type: Sequelize.INTEGER,  // Use INTEGER for parentId
        allowNull: true,         // Can be null
        defaultValue: null,      // Default value for parentId
      },
      isGroup: {
        type: Sequelize.BOOLEAN,  // Use BOOLEAN for isGroup
        allowNull: false,         // Cannot be null
        defaultValue: false,      // Default value for isGroup
      },
      createdAt: {
        type: Sequelize.DATE,     // Use DATE for createdAt
        defaultValue: Sequelize.NOW, // Default to current date
      },
      updatedAt: {
        type: Sequelize.DATE,     // Use DATE for updatedAt
        defaultValue: Sequelize.NOW, // Default to current date
      },
    });
  },

  async down (queryInterface, Sequelize) {
    // Drop the Menus table if it exists
    await queryInterface.dropTable('Menus');
  }
};
