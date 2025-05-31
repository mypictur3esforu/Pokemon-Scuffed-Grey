import dbAccess from "./Poke.js"
const preparedSQL = dbAccess.preparedSQL
const insertIntoTable = dbAccess.insertIntoTable
const sql = dbAccess.postOrder

async function addPlayer(name, username, password) {
        if(name == "" || password == "" || username == "") return null
        if (! await usernameAvailable(username)) return false
        console.log("Hallo");
        await insertIntoTable("trainer", [username, name, '0', "Battalia City", "Home"])
        await insertIntoTable('player', [username, password, 0])
        return true
}

async function usernameAvailable(username) {
        const res = Object.values(await preparedSQL("select * from trainer where username = ?", [username]))
        return res.length < 1
}

async function checkPlayerLogin(id, password) {
        // console.log(id, password);
        return Object.values(await preparedSQL("Select * from player where id = ? and password = ?", [id, password])).length == 1
}

async function login(id, password) {
        if(!await checkPlayerLogin(id, password)) return false
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
window.checkPlayerLogin = checkPlayerLogin;
window.login = login;