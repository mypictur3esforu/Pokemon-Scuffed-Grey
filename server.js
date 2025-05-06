//import express from 'express'
const express = require('express')
const { findSourceMap } = require('module')
//import path from 'path'
const path = require('path')
const { json } = require('stream/consumers')
const database = Object.values(Object.values(require("./database.js"))[1])
const sql = database[0]
const preparedSQL = database[1]

const app = express()

// app.use((err, req, res, next) =>{
//     console.error(err.stack)
//     res.status(500).send("Something broke")
// })

app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, "public/views/Poke.html"))
});

app.get("/start", (req, res) =>{
    res.sendFile(path.join(__dirname, "/public/views/start.html"))
})

app.get('/api/pokemon', async function(req, res){
    const pokemon = await sql("Select * from pokemon_blueprint limit 10")
    console.log(pokemon);
    res.status(200).json(pokemon);
})

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
    console.log(parcel);
    console.log(preparedSQL)
    const ans = await preparedSQL(parcel[0], parcel[1])
    console.log(ans)
    res.status(200).send({status: 'received'})
    if(!parcel) res.status(400).send({status: 'Not received'})
})

app.listen(8080, () => {
    console.log("Server running on 8080!");
})

