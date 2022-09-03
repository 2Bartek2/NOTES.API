const Sequelize = require("sequelize");


const sequelize = new Sequelize("db", "root", "password", {
	dialect: "mysql",
	host: "localhost",
	port: 3307 ,
	pool: {
		max: 5,
		min: 1,
		acquire: 30000,
		idle: 10000,
	},
	
});

sequelize.authenticate();

module.exports = { sequelize }