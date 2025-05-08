import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise()

async function generateSpawnRules() {
  const locs = (Object.values(await sql(
    `select * from location
    where name not like "%home%"
    and name not like "%marketplace%"
    and name not in (select type from shop)
    and name not in (select name from poke_center);`)))
  //console.log(locs)
  //Pokemon die gefangen werden können
  const pokemons = Object.values(await sql(
    `select * from pokemon_blueprint
    where category not like "%legendary%"
    and category not like "%mythical%"
    and category not like "%ultra%"
    and category not like "%paradox%"
    and category not like "%mega%";`
  ))
  for(let i = 0; i<pokemons.length; i++){
    let bp_id = Object.values(pokemons[i])[0]
    let destination = Object.values(locs[random(0, locs.length -1)])[0]
    let location = Object.values(locs[random(0, locs.length -1)])[1]
    let min = (await oneLinerSQL("Select catch_rate from Pokemon_Blueprint where id = "+ bp_id+";"))[0]
    let probability = random(min, 1000) //random(catch_rate des Pokemons, 1000)
    let min_level = random(1, 90)
    let max_level = min_level + 3
    let inhabits = "insert into inhabits values( "+bp_id+", '"+destination+"', '"+location+"', "+probability+", "+min_level+", "+max_level+");"  
    console.log(inhabits)
    await sql(inhabits)
  }
}

function random(min, max){
  let result = Math.round(Math.random()*max + min)
  return result
}

/**
 * Funktion generiert wilde Pokemon.
 * 1. Spieler Position wird gefunden.
 * 2. Alle Wahrscheinlichkeiten für Spawnen der Pokemon in der Location des Spielers werden addiert. (Bsp. probabilits=[2, 4, 3] addiertProbs=[2, 6, 9])
 * 3. Random Zahl wird generiert und es wird geschaut in welcher Probability Range die random Zahl liegt. Das ist die Blaupause des neuen Pokemon!
 * 4. insert Statement wird generiert. 
 */
async function generatePokemon(){
  let playerLoq = (await oneLinerSQL("Select destination, location from trainer where id = 1;"))
  let destination = playerLoq[0]
  let location = playerLoq[1]
  const bpsInLocation = await sql("Select blueprint from inhabits where destination = '"+destination+"' and location = '"+location+"';")
  let allProbsInLoq = await sql("Select probability from inhabits where destination = '"+destination+"' and location = '"+location+"';")
  let addedProbs = [parseInt(Object.values(allProbsInLoq[0]))]
  for (let i = 1; i < allProbsInLoq.length; i++) {
    addedProbs[i] = parseInt(Object.values(allProbsInLoq[i])) + addedProbs[i-1]    
  }
  for (let i = 0; i < 10; i++) {
    let bpProb = random(0, addedProbs[addedProbs.length-1])
    let z; for( z = 0; parseInt(bpProb) > parseInt(addedProbs[z]); z++){}
    const bp = Object.values(bpsInLocation[z])[0]
    console.log(await oneLinerSQL("Select name from pokemon_blueprint where id = " +bp+";"));
    const level = await oneLinerSQL("Select min_level, max_level from inhabits where blueprint = "+bp+" and destination = '"+ destination+"' and location = '"+location+"';")
    let insert = "insert into Pokemon values (null, "+bp+", "+(level[0]+random(0, level[1]-level[0]))+", null, null);"
    console.log(insert);
  }
}

async function sql(sqlOrder) {
  let result = await pool.query(sqlOrder)
  // console.log(result)
  return Object.values(result)[0]
}

async function preparedSQL(sqlOrder, userInput) {
  console.log("Prepared SQL:", sqlOrder, userInput);
  let result = await pool.query(sqlOrder, userInput)
  // console.log(result)
  return Object.values(result)[0]
}

async function oneLinerSQL(sqlOrder){
  return Object.values((await sql(sqlOrder))[0])
}

export default {sql, preparedSQL}