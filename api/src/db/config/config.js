require("dotenv").config();

module.exports = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: "127.0.0.1",
    dialect: "mysql",
    dialectOptions: {
      connectTimeout: 60000,
    },
  },
  test: {
    database: "ebooks-db-test",
    username: "root",
    password: "122334john",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: "127.0.0.1",
    port: "3306",
    dialect: "mysql",
  },
};
