const oracledb = require("oracledb");
require("dotenv").config();

// Oracle DB connection configuration

// Oracle DB connection function
async function initiateOracleDB() {
  try {
    await oracledb.createPool({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECTION_STRING,
      poolMin: 1,
      poolMax: 4,
      poolIncrement: 1,
    });
    console.log("Oracle Pool created");
  } catch (error) {
    console.error("Error connecting to Oracle DB: ", error);
    throw error;
  }
}

function getOracleDBConnection() {
  return oracledb.getConnection();
}

module.exports = { initiateOracleDB, getOracleDBConnection, oracledb };
