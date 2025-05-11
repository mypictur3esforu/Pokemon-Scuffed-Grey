import dbAccess from "./Poke.js"
const insertIntoDB = dbAccess.insertIntoDB
const insertIntoTable = dbAccess.insertIntoTable

async function addPlayer(name, password) {
        console.log("Player:", name);
        if(name == "" || password == "") return
        const id = await insertIntoTable("trainer", [null, name, '0', "Battalia City", "Home"])
        await insertIntoTable('player', [id, password])
        document.getElementsByClassName("res")[0].innerHTML = "Your ID is: <b style ='color:red;'>"+id+"</b>.\nMake sure to remember both your ID and your Password"
        document.getElementById("con").style = "display: block;"
}
window.addPlayer = addPlayer;