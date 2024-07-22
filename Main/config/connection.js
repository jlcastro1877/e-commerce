require("dotenv").config();
const { Sequelize } = require("sequelize");

// Check that the required environment variables are set
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD) {
  throw new Error(
    "Missing required environment variables: DB_NAME, DB_USER, DB_PASSWORD"
  );
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,
    dialectOptions: {},
  }
);

module.exports = sequelize;
