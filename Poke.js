import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

var query = "SELECT * FROM Pokemon_Blueprint where id = 1;";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise()

async function generatePokemon(){
  const bpAmount = Object.values(await sql("select count(*) from Pokemon_Blueprint"))[0]
  for (let i = 0; i < 10; i++) {
    const randomBP = Math.round(Math.random() * bpAmount)
    var temp = "insert into Pokemon values (null, "
    const id = 0
  }
}

async function sql(sqlOrder) {
  var result = await pool.query(sqlOrder)
  console.log(Object.values(result[0][823]))
  const row = result[0][0]
  console.log(row)
  return row
}

//sql("Insert into Trainer (ID, name, money, destination, location) values (null, 'Ash', 1000, 'Battalia City', 'Home')")
//sql("Select * from trainer where id = 3")
//Math.floor(Math.random() * sql("select count(*) from Pokemon_Blueprint"))
console.log(Object.values(await sql("select * from Pokemon_Blueprint")))