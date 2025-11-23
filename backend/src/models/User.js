const { getOracleDBConnection, oracledb } = require("../config/database");

// create a user
async function createUser({ email, password_hash, name }) {
  const connection = await getOracleDBConnection();
  try {
    // Insert user
    const sql = `INSERT INTO users (email, password_hash, name)
                 VALUES(:email, :password_hash, :name)`;
    const binds = {
      email,
      password_hash,
      name: name || null,
    };

    await connection.execute(sql, binds, { autoCommit: true });
    
    // Fetch the created user
    const selectSql = `SELECT id, email, password_hash, name, created_at FROM users WHERE email = :email`;
    const result = await connection.execute(selectSql, { email }, { outFormat: oracledb.OUT_FORMAT_OBJECT });
    
    if (!result.rows || result.rows.length === 0) {
      throw new Error('Failed to retrieve created user');
    }
    
    const row = result.rows[0];
    return {
      id: row.ID,
      email: row.EMAIL,
      password_hash: row.PASSWORD_HASH,
      name: row.NAME,
      created_at: row.CREATED_AT,
    };
  } catch (error) {
    console.error("Error creating user: ", error.message);
    throw error;
  } finally {
    await connection.close();
  }
}

// get user by email
async function getUserByEmail(email) {
  const connection = await getOracleDBConnection();
  try {
    const sql =
      "SELECT id, email, password_hash, name, created_at FROM users WHERE email = :email";
    const result = await connection.execute(
      sql,
      { email },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    if (!result.rows || result.rows.length === 0) return null;
    const row = result.rows[0];
    return {
      id: row.ID,
      email: row.EMAIL,
      password_hash: row.PASSWORD_HASH,
      name: row.NAME,
      createdAt: row.CREATED_AT,
    };
  } catch (error) {
    console.error("Error while fetching user by email: ", error);
    throw error;
  } finally {
    await connection.close();
  }
}

// get user by id
async function getUserById(id) {
  const connection = await getOracleDBConnection();
  try {
    const sql =
      "SELECT id, email, password_hash, name, created_at FROM users WHERE id = :id";
    const result = await connection.execute(
      sql,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    if (!result.rows || result.rows.length === 0) return null;
    const row = result.rows[0];
    return {
      id: row.ID,
      email: row.EMAIL,
      password_hash: row.PASSWORD_HASH,
      name: row.NAME,
      createdAt: row.CREATED_AT,
    };
  } catch (error) {
    console.error("Error while fetching user by id: ", error);
    throw error;
  } finally {
    await connection.close();
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
