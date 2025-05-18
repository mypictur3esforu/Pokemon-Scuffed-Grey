import express from 'express'
import path from 'path'
import database from  "./database.js"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sql = database.sql
const preparedSQL = database.preparedSQL

const app = express()

app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, "public/views/Poke.html"))
});

app.get('/city', (req, res) =>{
    res.sendFile(path.join(__dirname, "public/views/city.html"))
});

app.get("/register", (req, res) =>{
    res.sendFile(path.join(__dirname, "/public/views/register.html"))
})

app.get("/login", (req, res) =>{
    res.sendFile(path.join(__dirname, "/public/views/login.html"))
})

app.get('/map', function(req, res){
    res.status(200).sendFile(path.join(__dirname, "/public/views/map.html"));
})

app.get('/destination/:destination', function(req, res) {
    console.log(req.params.destination);
    res.send(`Du hast '${req.params.destination}' als Ziel angegeben.`);
});

app.use(express.json())
app.post('/sql', async function(req, res){
    const {parcel} = req.body
    console.log(parcel);
    const ans = await sql(parcel)
    console.log(ans)
    res.status(200).send({status: 'received'})
    if(!parcel) res.status(400).send({status: 'Not received'})
})

app.post('/sql/prepared', async function(req, res) {
    const {parcel} = req.body
    const ans = await preparedSQL(parcel[0], parcel[1])
    console.log("Ans:", ans)
    // res.send(ans.insertId)
    // res.status(200).send({status: 'received'}, ans)
    res.send(ans)
    if(!parcel) res.status(400).send({status: 'Not received'})
})

app.get("/fight", (req, res) =>{
    res.sendFile(path.join(__dirname, "/public/views/fight.html"))
})

app.listen(8080, () => {
    console.log("Server running on 8080!");
})

