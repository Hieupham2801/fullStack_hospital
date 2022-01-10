'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    specialty.init({
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        description: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'specialties',
    });
    return specialty;
};