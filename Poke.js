const mysql = require('mysql2')

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2007",
  database: "myDB"
})

function executeSQL(sql) {
    const rows = db.query(sql)[0]
  //const rows = "ewtfgv"
  return rows
}

// function userSQL(sql){
//   sql = "Select * from Pokemon"
//   console.log(executeSQL(sql))
//   document.getElementById("ans").innerHTML = executeSQL(sql)
// }

// //console.log(executeSQL("select * from Pokemon"))


var query = "SELECT * FROM table;";

async function getResult() {
    // Use 'await' to wait for the query to complete
    const [rows, fields] = await database.promise().query(query);
    return rows;  // Return the result
}

async function main() {
  // Use 'await' when calling the function to get the actual result
  var result = await getResult();
  console.log(result);  // Log the result
}
main()

