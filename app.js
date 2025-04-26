//import express from 'express'
const express = require('express')
//import path from 'path'
const path = require('path')
const { json } = require('stream/consumers')

const app = express()

// app.use((err, req, res, next) =>{
//     console.error(err.stack)
//     res.status(500).send("Something broke")
// })

app.use(express.static('public'));

app.get('/', (req, res) =>{
        res.sendFile(path.join(__dirname, "Poke.html"))
    //     res.render('Poke.html', {
    //         title: 'My Site',
    //     nav: ['Home','About','Contact'] 
    //   });
});

app.get('/api/pokemon', (req, res) => {
    const users = [{
        id: "1",
        name: "Bisasam",
    },{
        id: "2",
        name: "Bisaknosp"
    },{
        id: "3",
        name: "Bisaflor"
    }];
    res.status(200).json(users);
})

app.use(express.json())
app.post('/sql', (req, res) => {
    const {parcel} = req.body
    console.log(parcel)
    res.status(200).send({status: 'received'})
    if(!parcel) res.status(400).send({status: 'Not received'})
})

app.listen(8080, () => {
    console.log("Server running on 8080!");
})