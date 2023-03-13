const dbConfig = require('../dbConfig/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');
const { belongsTo } = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}
)
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users= require('./user_mod')(sequelize, DataTypes);
db.families= require('./family_mod')(sequelize, DataTypes);
db.users.belongsTo(db.families,{foreignKey:'familyId'});
db.permissions= require('./permission_mod')(sequelize, DataTypes);
db.users.belongsTo(db.permissions,{foreignKey:'permissionId'});

db.categories= require('./category_mod')(sequelize, DataTypes);
db.processes= require('./process_mod')(sequelize, DataTypes);
db.expenses= require('./expense_mod')(sequelize, DataTypes);
db.expenses.belongsTo(db.families,{foreignKey:'familyId'});
db.expenses.belongsTo(db.categories,{foreignKey:'categoryId'});
db.incomes= require('./income_mod')(sequelize, DataTypes);
db.incomes.belongsTo(db.families,{foreignKey:'familyId'});

db.permissions_processes= require('./permission_process_mod')(sequelize, DataTypes);
db.permissions_processes.belongsTo(db.processes,{foreignKey:'processId'});
db.permissions_processes.belongsTo(db.permissions,{foreignKey:'permissionId'});

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })

module.exports = db;