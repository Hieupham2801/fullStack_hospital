const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('hieu_pham', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false

});
let connectDB = async () => {
    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = connectDB