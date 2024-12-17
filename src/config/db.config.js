module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: process.env.dialect,
  port: process.env.port,
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};