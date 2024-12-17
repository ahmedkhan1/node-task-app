const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const { isEqual, isEmpty } = require("lodash");
const seedAdmin = require("../utils/seed.js");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    //port: '8889',
    operatorsAliases: false,
    logging:false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    
    return (

      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
     db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


sequelize
  .authenticate()
  .then(async() => {
    sequelize.sync();

    // Create Default Admin if not exist
    await seedAdmin(sequelize);
    
    console.log('DB Connection', { status: "Successfully connected" });

  })
  .catch((err) => {
    console.log(err);
    console.log('DB Connection', { status: "Failed to connect", Error: err.toString() });
  });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
