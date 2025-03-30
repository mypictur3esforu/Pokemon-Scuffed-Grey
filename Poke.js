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

function userSQL(sql){
  document.getElementById("ans").innerHTML = "Neeo"
}

console.log(executeSQL("select * from Pokemon"))