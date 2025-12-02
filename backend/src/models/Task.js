const database = require("oracledb");
const { getOracleDBConnection, oracledb } = require("../config/database");

// Create a new task
async function createTask({
  user_id,
  title,
  description = "",
  priority = "MEDIUM",
  state = "NEW",
}) {
  const connection = await getOracleDBConnection();
  // variable to hold the generated ID
  let taskId;
  try {
    // Insert task
    const sql = `INSERT INTO tasks (user_id, title, description, priority, state)
                 VALUES (:user_id, :title, :description, :priority, :state) 
                 RETURNING id INTO :outputId`;
    const binds = {
      user_id,
      title,
      description,
      priority,
      state,
      outputId: {type: database.NUMBER, dir: database.BIND_OUT}
    };

    const insertResult = await connection.execute(sql, binds, { autoCommit: true });
    console.log("Insert result:", insertResult.rowsAffected);

    taskId = insertResult.outBinds.outputId[0];
    console.log("Newly created task id: ", taskId);
    

    // Get the last inserted task by fetching the most recent task for this user
    const selectSql = `SELECT id, user_id, title, description, created_date, priority, state, completed, updated_at 
    FROM tasks
                      WHERE id = :taskId`;

    const result = await connection.execute(selectSql, { taskId }, { outFormat: oracledb.OUT_FORMAT_OBJECT });
    console.log("Select result rows:", result.rows);

    if (!result.rows || result.rows.length === 0) {
      throw new Error('Failed to retrieve created task - no rows returned');
    }

    const row = result.rows[0];
    return {
      id: row.ID,
      user_id: row.USER_ID,
      title: row.TITLE,
      description: row.DESCRIPTION,
      created_date: row.CREATED_DATE,
      priority: row.PRIORITY,
      state: row.STATE,
      completed: row.COMPLETED === 1 || row.COMPLETED === 'Y',
      updated_at: row.UPDATED_AT,
    };
  } catch (error) {
    console.error("Error creating task: ", error.message);
    console.error("Full error:", error);
    throw error;
  } finally {
    await connection.close();
  }
}

// Get all tasks with filters
async function getAllTasks({
  user_id,
  search = "",
  priority = "",
  state = "",
  limit = 50,
  offset = 0,
}) {
  let connection;
  try {
    connection = await getOracleDBConnection();
    let binds = {};
    let whereClauses = ["user_id = :user_id"];
    binds.user_id = user_id;

    if (search) {
      whereClauses.push(
        "(LOWER(title) LIKE :search OR LOWER(description) LIKE :search)"
      );
      binds.search = `%${search.toLowerCase()}%`;
    }
    if (priority) {
      whereClauses.push("priority = :priority");
      binds.priority = priority;
    }
    if (state) {
      whereClauses.push("state = :state");
      binds.state = state;
    }

    const whereSQL = whereClauses.length
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";
    const sql = `SELECT id, user_id, title, description, created_date, priority, state, completed, updated_at 
                         FROM tasks ${whereSQL}
                         ORDER BY created_date DESC
                         OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY`;

    binds.offset = offset;
    binds.limit = limit;

    const result = await connection.execute(sql, binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    return result.rows.map((row) => ({
      id: row.ID,
      user_Id: row.USER_ID,
      title: row.TITLE,
      description: row.DESCRIPTION,
      createdDate: row.CREATED_DATE,
      priority: row.PRIORITY,
      state: row.STATE,
      completed: row.COMPLETED === 1,
      updatedAt: row.UPDATED_AT,
    }));
  } catch (error) {
    console.error("Error getting all tasks: ", error.message);
    throw error;
  } finally {
    await connection.close();
  }
}

// Get task by ID
async function getTaskById(id, user_id) {
  const connection = await getOracleDBConnection();
  try {
    const sql = `SELECT id, user_id, title, description, created_date, priority, state, completed, updated_at FROM tasks WHERE id = :id AND user_id = :user_id`;
    const result = await connection.execute(
      sql,
      { id, user_id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (!result.rows || result.rows.length === 0) return null;

    const row = result.rows[0];

    return {
      id: row.ID,
      userId: row.USER_ID,
      title: row.TITLE,
      description: row.DESCRIPTION,
      createdDate: row.CREATED_DATE,
      priority: row.PRIORITY,
      state: row.STATE,
      completed: row.COMPLETED === 1,
      updatedAt: row.UPDATED_AT,
    };
  } catch (error) {
    console.error("Error getting task by id: ", error.message);
    throw error;
  } finally {
    await connection.close();
  }
}

// update task
async function updateTask(id, user_id, updates) {
  const connection = await getOracleDBConnection();
  try {
    const allowedFields = [
      "title",
      "description",
      "priority",
      "state",
      "completed",
    ];
    const updateFields = [];
    const binds = { id, user_id, updated_at: new Date() };

    Object.keys(updates).forEach((field) => {
      if (allowedFields.includes(field)) {
        updateFields.push(`${field} = :${field}`);
        binds[field] = updates[field];
      }
    });
    if (updateFields.length === 0) {
      return getTaskById(id, user_id);
    }

    updateFields.push("updated_at = :updated_at");
    const sql = `UPDATE tasks SET ${updateFields.join(",")} WHERE id = :id AND user_id = :user_id`;
    await connection.execute(sql, binds, { autoCommit: true });
    return getTaskById(id, user_id);
  } catch (error) {
    console.error("Error updating task: ", error.message);
    throw error;
  } finally {
    await connection.close();
  }
}

// delete a task
async function deleteTask(id, user_id) {
  const conn = await getOracleDBConnection();
  try {
    const sql = "DELETE FROM tasks WHERE id = :id AND user_id = :user_id";
    const result = await conn.execute(sql, { id, user_id }, { autoCommit: true });

    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error deleting task: ", error.message);
    throw error;
  } finally {
    await conn.close();
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
