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