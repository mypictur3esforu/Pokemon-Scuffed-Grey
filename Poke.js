import mysql from 'mysql2'

var query = "SELECT * FROM Pokemon;";

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '2007',
  database: 'notes_app',
}).promise()


  var result = await pool.query("SELECT * FROM notes;")
  const row = result[0][0]
  console.log(result)
  console.log(row)