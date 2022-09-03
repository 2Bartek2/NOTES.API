const Sequelize = require("sequelize");
const sequelize = require('../database').sequelize


const Notes = sequelize.define(
	"notes",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			allownull:false,
			autoIncrement: true
		},
		title: {
			type: Sequelize.STRING(100),
			allownull: false,
		},
		note: {
			type: Sequelize.STRING,
			allownull: true,
		},
	},
	{
		paranoid: true,
	}
);
// sequelize.sync({force: true})
// .then(() => {
// 	console.log('database and tables created');
// })

module.exports = { Notes }