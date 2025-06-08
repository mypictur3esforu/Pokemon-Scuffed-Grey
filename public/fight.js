import pokeJS from "./Poke.js"
const imageURL = pokeJS.getImageURL

function imageURLTemp(id){
   const url = imageURL(id)
   console.log(url);
   // document.getElementById('img').src = url
}


window.imageURLTemp = imageURLTemp