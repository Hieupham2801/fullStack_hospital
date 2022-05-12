"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class specialty extends Model {
    static associate(models) {
      // define association here
    }
  }
  specialty.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      descriptionHTML: DataTypes.TEXT("long"),
      descriptionMD: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "specialties",
    }
  );
  return specialty;
};
