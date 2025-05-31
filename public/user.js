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

async function checkPlayerLogin(username, password) {
        // console.log(username, password);
        return Object.values(await preparedSQL("select * from player where username = ? and password = ?", [username, password])).length == 1
}

async function login(username, password) {
        if(!await checkPlayerLogin(username, password)) return false
        newToken(username)
        return true
}

async function newToken(username) {
        const token = generateToken();
        const cookie = {username: username, token: token}
        // createCookie("player", JSON.stringify(cookie))
        document.cookie = '""=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        // console.log(document.cookie = document.cookie.split("{")[0] + "=; expires");
        const updateToken = "update player set token = ? where username = ?"
        const res = await preparedSQL(updateToken, [token, username])
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