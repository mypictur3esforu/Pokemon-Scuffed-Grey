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
  //Pokemon die gefangen werden können
  const pokemons = Object.values(await sql(
    `select * from pokemon_blueprint
    where category not like "%legendary%"
    and category not like "%mythical%"
    and category not like "%ultra%"
    and category not like "%paradox%"
    and category not like "%mega%";`
  ))
  for (let i = 1; i < pokemons.length; i++) {
    let bp_id = Object.values(pokemons[i])[0]
    const pokType = Object.values(await sql("select type from possess where blueprint = " + bp_id + ";"))
    let locs = (Object.values(await sql(
      `select destination, l.name
        from location l, possess p, destination d
        where l.destination = d.name
        and 
	      case 
          when p.type in( d.type)
          then p.type = d.type
          else true
	      end
        and p.blueprint = `+ pb_id + `
        and l.name not like "%home%"
        and l.name not like "%marketplace%"
        and l.name not in (select type from shop)
        and l.name not in (select name from poke_center);`)))
    // console.log("BP", bp_id, "Locs", locs);
    let destination = Object.values(locs[random(0, locs.length - 1)])[0]
    let location = Object.values(locs[random(0, locs.length - 1)])[1]
    let min = (await oneLinerSQL("Select catch_rate from Pokemon_Blueprint where id = " + bp_id + ";"))[0]
    let probability = random(min, 1000) //random(catch_rate des Pokemons, 1000)
    let min_level = random(1, 90)
    let max_level = min_level + 3
    let inhabits = "insert into inhabits values( " + bp_id + ", '" + destination + "', '" + location + "', " + probability + ", " + min_level + ", " + max_level + ");"
    console.log(inhabits)
    await sql(inhabits)
  }
}
//generateSpawnRules()

function random(min, max) {
  let result = Math.round(Math.random() * max + min)
  return result
}

/**
 * Funktion generiert wilde Pokemon.
 * 1. Spieler Position wird gefunden.
 * 2. Alle Wahrscheinlichkeiten für Spawnen der Pokemon in der Location des Spielers werden addiert. (Bsp. probabilits=[2, 4, 3] addiertProbs=[2, 6, 9])
 * 3. Random Zahl wird generiert und es wird geschaut in welcher Probability Range die random Zahl liegt. Das ist die Blaupause des neuen Pokemon!
 * 4. insert Statement wird generiert. 
 */
async function generatePokemon(destination, location, amount) {
  // let playerLoq = (await oneLinerSQL("Select destination, location from trainer where id = 1;"))
  // let destination = playerLoq[0]
  // let location = playerLoq[1]
  const bpsInLocation = await sql("Select blueprint from inhabits where destination = '" + destination + "' and location = '" + location + "';")
  let allProbsInLoq = await sql("Select probability from inhabits where destination = '" + destination + "' and location = '" + location + "';")
  let addedProbs = [parseInt(Object.values(allProbsInLoq[0]))]
  for (let i = 1; i < allProbsInLoq.length; i++) {
    addedProbs[i] = parseInt(Object.values(allProbsInLoq[i])) + addedProbs[i - 1]
  }
  for (let i = 0; i < amount; i++) {
    let bpProb = random(0, addedProbs[addedProbs.length - 1])
    let z; for (z = 0; parseInt(bpProb) > parseInt(addedProbs[z]); z++) { }
    const bp = Object.values(bpsInLocation[z])[0]
    console.log(await oneLinerSQL("Select name from pokemon_blueprint where id = " + bp + ";"));
    const level = await oneLinerSQL("Select min_level, max_level from inhabits where blueprint = " + bp + " and destination = '" + destination + "' and location = '" + location + "';")
    let insert = "insert into Pokemon values (null, " + bp + ", " + (level[0] + random(0, level[1] - level[0])) + ", 'NPC 0', null);"
    // console.log(insert);
    await sql(insert)
  }
}

async function sql(sqlOrder) {
  // console.log(sqlOrder);
  const result = await pool.query(sqlOrder)
  // console.log(result)
  return Object.values(result)[0]
}

async function preparedSQL(sqlOrder, userInput) {
  // console.log("Prepared SQL:", sqlOrder, userInput);
  const result = await pool.query(sqlOrder, userInput)
  // console.log(result)
  return Object.values(result)[0]
}

async function oneLinerSQL(sqlOrder) {
  return Object.values((await sql(sqlOrder))[0])
}

async function trainerSpawner(destination) {
  destination = 'Northern Frostwind'
  const loqs = Object.values(await preparedSQL('select name from location where destination = ?', [destination]))
  for (let i = 0; i < 20; i++) {
    let name = 'NPC ' + i
    try {
      console.log(await preparedSQL('insert into trainer values (?,?,?,?,?)', [name, name, random(5, 50) * 100, destination, loqs[random(0, loqs.length - 1)].name]))
    } catch {
      console.error('Error occured while inserting trainer into the database!')
    }
  }
}

/**
 * Füllt eine Destination mit 5 Pokemon pro Location.
 * @param {Destination in der Pokemon generiert werden sollen} destination 
 */
async function destinationPokemonGenerator(destination) {
  let loqs = Object.values(await preparedSQL('select * from location where destination = ? and name in(select location from inhabits where destination = ?)', [destination, destination]))
  for (let i = 0; i < loqs.length; i++) {
    await generatePokemon(destination, loqs[i].name, 5)
  }
}

/**
 * Gibt die Adresse des Bilds eines Pokemons an
 * @param {ID des Pokemon wessen Bild gesucht wird} id 
 * @returns Die URL die Bilds
 */
async function getImageURL(id) {
  id = await getImageNumber(id)
  const baseURL = "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/imagesHQ/"
  const format = ".png"
  const url = baseURL + id + format
  return url
}

/**
 * Konvertiert die ID des Pokemons aus der Datenbank in die ID des Entsprechenden Bildes
 * @param {ID des Pokemons} id 
 * @returns Die konvertierte ID (zB 007)
 */
async function getImageNumber(id) {
  id = await removeNonBasePokemon(id)
  id += ""
  while (id.split("").length < 3) {
    id = "0" + id
    // console.log("getImageNumber", id);
  }
  console.log(id);
  return id
}

/**
 * Entfernt alle Pokemon, die normalerweise keine eigenen Pokemon sind, um so die ID des Bildes zu ermitteln 
 * @param {ID des Pokemon, dessen Bild geuscht wird} id 
 * @returns Die ID des Bilds, dass zu dem Pokemon gehört
 */
async function removeNonBasePokemon(id) {
  const res = await preparedSQL("select count(*) as count from (select * from (select * from Pokemon_Blueprint where id not in (428, 476, 520, 522, 506, 508, 518, 519, 593, 595, 599) limit ?) y where name like '%\(%\)%') x", [id])
  // console.log(res[0].count);
  id -= res[0].count
  return id
}

export default { sql, preparedSQL, getImageURL }