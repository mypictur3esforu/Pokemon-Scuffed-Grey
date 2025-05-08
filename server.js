const express = require('express')
const { findSourceMap } = require('module')
const path = require('path')
const { json } = require('stream/consumers')
const database = Object.values(Object.values(require("./database.js"))[1])
const sql = database[0]
const preparedSQL = database[1]

const app = express()

app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, "public/views/Poke.html"))
});

app.get("/start", (req, res) =>{
    res.sendFile(path.join(__dirname, "/public/views/start.html"))
})

app.get('/map', function(req, res){
    res.status(200).sendFile(path.join(__dirname, "/public/views/map.html"));
})

app.get('/destination/:des', function(req, res) {
    console.log(req.params.des);
    res.send(`Du hast '${req.params.des}' als Ziel angegeben.`);
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
    // console.log(ans)
    res.send(ans.insertId)
    // res.status(200).send({status: 'received'}, ans.insertId)
    if(!parcel) res.status(400).send({status: 'Not received'})
})

app.listen(8080, () => {
    console.log("Server running on 8080!");
})

