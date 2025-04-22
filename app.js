//import express from 'express'
const express = require('express')
//import path from 'path'
const path = require('path')

const app = express()

// app.use((err, req, res, next) =>{
//     console.error(err.stack)
//     res.status(500).send("Something broke")
// })

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, "Poke.html"))
})

app.get('/api/users', (req, res) => {
    // const users = [{
    //     id: "1",
    //     name: "Bisasam",
    // },{
    //     id: "2",
    //     name: "Bisaknosp"
    // },{
    //     id: "3",
    //     name: "Bisaflor"
    // }];
    // res.json(users);
    res.sendDate();
})

app.get('/api/1', (req, res) => {
    const obj = [{name: "1"}, {name: "2"}]
    res.json(obj)
})

app.get("/messages", (req, res) => {
    res.send("Hello");
 });

app.listen(8080, () => {
    console.log("Server running on 8080!");
})