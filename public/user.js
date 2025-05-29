import dbAccess from "./Poke.js"
const preparedSQL = dbAccess.preparedSQL
const insertIntoTable = dbAccess.insertIntoTable
const sql = dbAccess.postOrder

async function addPlayer(name, password) {
        console.log("Player:", name);
        if(name == "" || password == "") return
        const res = await insertIntoTable("trainer", [null, name, '0', "Battalia City", "Home"])
        const id = res.insertId
        console.log(id);
        await insertIntoTable('player', [id, password, 0])
        document.getElementsByClassName("res")[0].innerHTML = "Your ID is: <b style ='color:red;'>"+id+"</b>.\nMake sure to remember both your ID and your Password"
        document.getElementById("con").style = "display: block;"
}

async function checkPlayer(id, password) {
        // console.log(id, password);
        return Object.values(await preparedSQL("Select * from player where id = ? and password = ?", [id, password])).length == 1
}

async function login(id, password) {
        if(!await checkPlayer(id, password)) return "Login has failed! Password or username is wrong."
        const token = generateToken();
        document.cookie="token=" + token + ";"
        const res = sql("update player set token = "+token+" where id="+id+";")
        return "Login Success!"
}

function generateToken(){
        let token = ""
        for (let i = 0; i < 20; i++) {
                token += Math.round(Math.random()*20)
        }
        // console.log(token);
}

window.addPlayer = addPlayer;
window.checkPlayer = checkPlayer;
window.login = login;