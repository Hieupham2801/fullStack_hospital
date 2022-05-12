"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  clinic.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      address: DataTypes.STRING,
      descriptionHTML: DataTypes.TEXT("long"),
      descriptionMD: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "clinics",
    }
  );
  return clinic;
};
