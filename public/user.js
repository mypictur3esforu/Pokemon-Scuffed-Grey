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
        if(!await checkPlayer(id, password)) return false
        newToken(id)
        return true
}

async function newToken(id) {
        const token = generateToken();
        const cookie = {id: id, token: token}
        // createCookie("player", JSON.stringify(cookie))
        // deleteCookie("player")
        // document.cookie = "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie = '""=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        console.log(document.cookie = document.cookie.split("{")[0] + "=; expires");
        const updateToken = "update player set token = "+token+" where id="+id+";"
        const res = await sql(updateToken)
}

function deleteCookie(cookieName){
        document.cookie = cookieName+ "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

function createCookie(cookieName, value, expiration){
        if (expiration == "" || expiration == null) document.cookie = cookieName+"= "+ value +"; path=/"
        else document.cookie = cookieName+"= "+ value +"; expires="+ expiration +";"
}

function generateToken(){
        let token = ""
        for (let i = 0; i < 9; i++) {
                token += Math.round(Math.random()*9)
        }
        // console.log(token);
        return token
}

window.addPlayer = addPlayer;
window.checkPlayer = checkPlayer;
window.login = login;