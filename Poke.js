var mysql = require('mysql2');

var mysql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2007",
  database: "myDB"
}).promise()

async function executeSQL(sql) {
  const [rows] = await mysql.query(sql)
  return rows
}

console.log(executeSQL("select * from Pokemon;"))