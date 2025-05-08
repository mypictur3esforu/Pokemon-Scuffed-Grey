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

    async function insertIntoDB(insert, userInput) {
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
        const data = await res.json();
        console.log("Data: \n"+data+"\n");
        return data
    }
    
    // location="/"
    
    async function insertIntoTable(table, values) {
        let insert = "insert into "+table+" values("
        insert = appendQuestionMarks(insert, values.length)
        return await insertIntoDB(insert, values)
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
        const id = await insertIntoTable("trainer", [null, name, '0', "Battalia City", "Home"])
        await insertIntoTable('player', [id, password])
        document.getElementsByClassName("res")[0].value = "Your ID is: "+id+".\nMake sure to remember both your ID and your Password"
        // insertIntoTable("Pokemon", [null, 1, 1, null, null])
    }