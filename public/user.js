import dbAccess from "./Poke.js"
import sqli from "./Poke.js"
const preparedSQL = dbAccess.preparedSQL
const insertIntoTable = dbAccess.insertIntoTable

async function addPlayer(name, password) {
        console.log("Player:", name);
        if(name == "" || password == "") return
        const id = await insertIntoTable("trainer", [null, name, '0', "Battalia City", "Home"])
        await insertIntoTable('player', [id, password])
        document.getElementsByClassName("res")[0].innerHTML = "Your ID is: <b style ='color:red;'>"+id+"</b>.\nMake sure to remember both your ID and your Password"
        document.getElementById("con").style = "display: block;"
}

async function checkPlayer(id, password) {
        // console.log(Object.values(await preparedSQL("Select * from player where id = ? and password = ?", [id, password])));
        // return false
        return Object.values(await preparedSQL("Select * from player where id = ? and password = ?", [id, password])).length == 1
}

async function getPlayer(id, password, resHTML) {
        if(! await checkPlayer(id,password)) resHTML.innerHTML = "Connection failed. Either your id or your password does not match (If you are unlucky neither of them are right))"
        else location = "/map"
}

window.addPlayer = addPlayer;
window.checkPlayer = checkPlayer;
window.getPlayer = getPlayer;