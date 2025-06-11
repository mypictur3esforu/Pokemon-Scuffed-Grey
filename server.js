import express from 'express'
import path from 'path'
import database from  "./database.js"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sql = database.sql
const preparedSQL = database.preparedSQL
const imageURL = database.getImageURL
const generatePokemon = database.generatePokemon

const app = express()

app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, "views/Poke.html"))
});

app.get('/destination/:destination', (req, res) =>{
    res.sendFile(path.join(__dirname, "views/destination.html"))
});

app.get("/register", (req, res) =>{
    res.sendFile(path.join(__dirname, "/views/register.html"))
})

app.get("/login", (req, res) =>{
    res.sendFile(path.join(__dirname, "/views/login.html"))
})

app.get('/map', function(req, res){
    res.status(200).sendFile(path.join(__dirname, "/views/map.html"));
})

app.set('view engine', 'ejs')

app.get('/preview/:destination', async function(req, res) {
    const destination = req.params.destination
    // console.log(destination);
    const pokemonSpawns = await preparedSQL(
        `with sum as (select sum(probability) as addedProb from inhabits where destination = ?)
        select row_number() over (order by location) as 'row', location, name, min_level, max_level, round(100 * probability / addedProb, 2) as probability
        from inhabits natural join (select id as blueprint, name, catch_rate from pokemon_blueprint) x, sum
        where destination = ?;`, [destination, destination])
    const trainers = await preparedSQL(
        `select name, money, location, round(avg(level), 1) as avarageLevel, count(*) as anzahlPokemon
        from trainer, pokemon
        where destination = ? 
        and trainer = username
        group by username
        having anzahlPokemon > 0`, [destination])
    // console.log(pokemonSpawns);
    res.render("city_preview", {pokemonSpawns: Object.values(pokemonSpawns), trainers: Object.values(trainers), destination: destination});
});

app.use(express.json())
app.post('/sql', async function(req, res){
    const {parcel} = req.body
    // console.log(parcel);
    const ans = await sql(parcel)
    // console.log(ans)
    // res.status(200).send(ans)
    res.send(ans)
    if(!parcel) res.status(400).send({status: 'Not received'})
})

app.post('/sql/prepared', async function(req, res) {
    const {parcel} = req.body
    const ans = await preparedSQL(parcel[0], parcel[1])
    // console.log("Ans:", ans)
    // res.send(ans.insertId)
    // res.status(200).send({status: 'received'}, ans)
    res.send(ans)
    if(!parcel) res.status(400).send({status: 'Not received'})
})

app.post("/fight", async function(req, res){
    const {player, gegner} = req.body
    // const gegPokemon = req.body.gegner
    // console.log("Player: ", playPokemon, "Gegner: ". gegPokemon);
    console.log("/fight Player: ", player)
    const gegnerId = gegner.blueprint, playerId = player.blueprint
    let gegneri = {
        infos: await preparedSQL("select * from Pokemon_Blueprint where id = ?", [gegnerId]),
        imageURL: await imageURL(gegnerId)
    }
    let playeri = {
        infos: await preparedSQL("select * from Pokemon_Blueprint where id = ?", [playerId]),
        imageURL: await imageURL(playerId)
    }
    res.render("fight", {gegner: gegneri, player: playeri})
})

app.get("/pokedex", (req, res) =>{
    res.sendFile(path.join(__dirname, "/views/pokedex.html"))
})

app.get("/api/imageURL/:pokemonID/:highResolution", async function(req, res) {
    try{
        const pokemonID = parseInt(req.params.pokemonID)
        const highRes = req.params.highResolution
        // console.log("Res:", highRes);
        res.send({imageURL: await imageURL(pokemonID, highRes == "true")})
    }catch{
        console.log(req.params,pokemonID);
        res.send("This ID is not parsable!")
    }
})

app.get("/city/:destination", async function(req, res){
    const destination = req.params.destination
    res.render("city", {destination: (await preparedSQL("select * from destination where name = ?", [destination]))[0],
        locations: await preparedSQL("select name from location where destination = ?", [destination])
    })
})

app.get("/encounter/:destination/all/locations", async function(req, res) {
    const destination = req.params.destination
    res.render("locations", {destination: destination,
        locations: await preparedSQL(`select * from location natural join inhabits
                                        where destination = ?
                                        and name = location
                                        group by location
                                        having count(*) > 0`, [destination])})
})


app.get("/encounter/:destination/:location", async function(req, res) {
    const destination = req.params.destination
    const location = req.params.location
    const loqTest = (await preparedSQL("select * from location where destination = ? and name = ?", [destination, location])).length == 1
    // console.log("LOQ:", location, "loq Test:", loqTest);
    if (!loqTest) res.redirect("/encounter/"+destination+"/all/locations")

    const fightRes = await fetch('http://localhost:8080/fight', {
            method: 'POST',
            headers:{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                player: generatePokemon((await preparedSQL("select * from inhabits limit 1"))[0]),
                gegner: generatePokemon((await preparedSQL("select * from inhabits order by 1 desc limit 1"))[0])
            })
        })
        const html = await fightRes.text()
        // console.log("Encounter Res", html);
    res.send(html)
})


app.listen(8080, () => {
    console.log("Server running on 8080!");
})