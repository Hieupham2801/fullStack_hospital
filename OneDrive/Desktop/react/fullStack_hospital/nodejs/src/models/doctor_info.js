"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class doctor_info extends Model {
    static associate(models) {
      doctor_info.belongsTo(models.User, { foreignKey: "doctorId" });
      doctor_info.belongsTo(models.Allcode, {
        foreignKey: "priceId",
        targetKey: "keyMap",
        as: "priceData",
      });
      doctor_info.belongsTo(models.Allcode, {
        foreignKey: "paymentId",
        targetKey: "keyMap",
        as: "paymentData",
      });
      doctor_info.belongsTo(models.Allcode, {
        foreignKey: "provinceId",
        targetKey: "keyMap",
        as: "provinceData",
      });
    }
  }
  doctor_info.init(
    {
      doctorId: DataTypes.INTEGER,
      priceId: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      addressClinic: DataTypes.STRING,
      nameClinic: DataTypes.STRING,
      note: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "doctor_info",
      freezeTableName: true,
    }
  );
  return doctor_info;
};
