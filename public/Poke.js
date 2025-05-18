  const baseURL = 'http://localhost:8080'
    async function postOrder() {
        const input = document.getElementById("input")
        if (input.value == "") {return}
        const res = await fetch(baseURL+'/sql', {
            method: 'POST',
            headers:{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                parcel: input.value
            })
        })
    }

    /**
     * Führt prepared SQL aus.
     * @param {SQL order with ? for user input variables} insert 
     * @param {User variables} userInput 
     * @returns Gibt SQL Output zurück
     */
    async function preparedSQL(insert, userInput) {
        const ans = [insert, userInput]
        const res = await fetch(baseURL+'/sql/prepared', {
            method: 'POST',
            headers:{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                parcel: ans
            })
        })
        console.log(res);
        const data = await res.json();
        // console.log("Data: \n"+data+"\n");
        return data
    }
    
    // location="/"
    
    /**
     * Vereinfachte Form von insertIntoDB. Braucht nur Tabelle und Values, um Daten in die DB einzufügen.
     * @param {Tabelle} table 
     * @param {Variablen} values 
     * @returns SQL Output
     */
    async function insertIntoTable(table, values) {
        let insert = "insert into "+table+" values("
        insert = appendQuestionMarks(insert, values.length)
        return await preparedSQL(insert, values)
    }

    /**
     * Setzt "?" an das Ende eines Strings
     * @param {String der bearbeitet werden soll (Usually Insert Befehl)} string 
     * @param {Anzahl der Fragezeichen} amount 
     */
    function appendQuestionMarks(string, amount){
        for (let index = 0; index < amount; index++) {
            string += "?"
            if(index + 1 < amount) string += ","
            else string += ");"          
        }
        return string
    }

    async function addPlayer(name, password) {
        console.log("Player:", name);
        if(name == "" || password == "") return
        const id = await insertIntoTable("trainer", [null, name, '0', "Battalia City", "Home"])
        await insertIntoTable('player', [id, password])
        document.getElementsByClassName("res")[0].value = "Your ID is: "+id+".\nMake sure to remember both your ID and your Password"
        //location = "/login"
}

    export default {preparedSQL, insertIntoTable}