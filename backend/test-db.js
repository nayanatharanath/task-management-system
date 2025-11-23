const oracledb = require('oracledb');
require('dotenv').config();

// Test DB Connection
async function testConnection() {
  try {
    const conn = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECTION_STRING
    });
    
    const result = await conn.execute('SELECT 1 FROM dual');
    console.log('✓ Oracle connection successful!');
    console.log('✓ Test query result:', result.rows);
    
    await conn.close();
  } catch (err) {
    console.error('✗ Connection failed:', err.message);
    process.exit(1);
  }
}

testConnection();
