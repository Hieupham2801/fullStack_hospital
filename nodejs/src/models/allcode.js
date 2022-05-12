"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    static associate(models) {
      Allcode.hasMany(models.User, {
        foreignKey: "positionId",
        as: "positionData",
      });
      Allcode.hasMany(models.User, {
        foreignKey: "gender",
        as: "genderData",
      });
      Allcode.hasMany(models.schedules, {
        foreignKey: "timeType",
        as: "timeTypeData",
      });
      Allcode.hasMany(models.doctor_info, {
        foreignKey: "priceId",
        as: "priceData",
      });
      Allcode.hasMany(models.doctor_info, {
        foreignKey: "paymentId",
        as: "paymentData",
      });
      Allcode.hasMany(models.doctor_info, {
        foreignKey: "provinceId",
        as: "provinceData",
      });
    }
  }
  Allcode.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );
  return Allcode;
};
