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
    dialectOptions: {
      // Optionally add SSL configuration here if needed
      // ssl: {
      //   require: true,
      //   rejectUnauthorized: false, // Note: For production, this should be true
      // },
    },
  }
);

module.exports = sequelize;

// // Require the dotenv module to load environment variables
// require('dotenv').config();
// // Require the Sequelize module
// const Sequelize = require("sequelize");
// // Create a new instance of Sequelize and connect to the database using the
// // JAWSDB_URL environment variable if available, otherwise use the DB_NAME, DB_USER, and DB_PASSWORD environment variables to connect to a local MySQL database
// const sequelize = process.env.JAWSDB_URL
//   ? new Sequelize(process.env.JAWSDB_URL)
//   : new Sequelize(
//       process.env.DB_NAME,
//       process.env.DB_USER,
//       process.env.DB_PASSWORD,
//       {
//         host: "localhost",
//         dialect: "postgres",
//         dialectOptions: {
//           decimalNumbers: true,
//         },
//       }
//     );
// // Export the sequelize instance for use in other modules
// module.exports = sequelize;
