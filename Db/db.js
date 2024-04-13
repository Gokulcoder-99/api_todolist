const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todoList',
  password: 'gokul',
  port: 5432
})

const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    task VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`

async function createTables () {
  try {
    await pool.query(createTablesQuery)
    console.log('Tables and Db running successfully')
  } catch (error) {
    console.error('Error creating tables:', error)
  }
}

createTables()

async function createUser (name, email, password) {
  const query = {
    text: 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *',
    values: [name, email, password]
  }

  try {
    const result = await pool.query(query)
    return result.rows[0]
  } catch (error) {
    console.error('Error creating user:', error)
  }
}

async function getUserByEmail (email) {
  const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email]
  }

  try {
    const result = await pool.query(query)
    return result.rows[0]
  } catch (error) {
    console.error('Error getting user by email:', error)
  }
}

async function createTodo (userId, task) {
  const query = {
    text: 'INSERT INTO todos(user_id, task) VALUES($1, $2) RETURNING *',
    values: [userId, task]
  }

  try {
    const result = await pool.query(query)
    return result.rows[0]
  } catch (error) {
    console.error('Error creating todo:', error)
  }
}

async function getTodosByUserId (userId) {
  const query = {
    text: 'SELECT * FROM todos WHERE user_id = $1',
    values: [userId]
  }

  try {
    const result = await pool.query(query)
    return result.rows
  } catch (error) {
    console.error('Error getting todos by user ID:', error)
  }
}

async function updateTodo (todoId, updatedTask, completed) {
  const query = {
    text: 'UPDATE todos SET task = $1, completed = $2 WHERE id = $3 RETURNING *',
    values: [updatedTask, completed, todoId]
  }

  try {
    const result = await pool.query(query)
    return result.rows[0]
  } catch (error) {
    console.error('Error updating todo:', error)
  }
}

async function deleteTodo (todoId) {
  const query = {
    text: 'DELETE FROM todos WHERE id = $1 RETURNING *',
    values: [todoId]
  }

  try {
    const result = await pool.query(query)
    return result.rows[0]
  } catch (error) {
    console.error('Error deleting todo:', error)
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  createTodo,
  getTodosByUserId,
  updateTodo,
  deleteTodo
}
