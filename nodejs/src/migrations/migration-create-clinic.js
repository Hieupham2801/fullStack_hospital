"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("clinics", {
      // address: DataTypes.STRING,
      // description: DataTypes.STRING,
      // image: DataTypes.STRING,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },

      image: {
        allowNull: false,
        type: Sequelize.BLOB("long"),
      },

      descriptionHTML: {
        allowNull: false,
        type: Sequelize.TEXT("long"),
      },
      descriptionMD: {
        allowNull: false,
        type: Sequelize.TEXT("long"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("clinics");
  },
};
