import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

var query = "SELECT * FROM Pokemon;";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise()


  var result = await pool.query("SELECT * FROM notes;")
  const row = result[0][0]
  console.log(result)
  console.log(row)