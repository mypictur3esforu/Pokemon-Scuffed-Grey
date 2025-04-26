function main(){
    alert("Funktioniert")
}


 async function temp() {
        const res = await fetch('/api/pokemon', {
        method: 'GET'
        })
        const data = await res.json()
        console.log(data);
    }
    //temp()
    // fetch('/api/users')
    // .then(response => response.json())
    // .then(users => console.log(users));
    //fetch('/api/messages')

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