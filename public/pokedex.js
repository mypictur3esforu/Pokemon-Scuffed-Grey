import dbAccess from "./Poke.js"
const preparedSQL = dbAccess.preparedSQL
const insertIntoTable = dbAccess.insertIntoTable
const sql = dbAccess.postOrder

const pokedexTemplate = document.querySelector("[pokedex-entry-template]")
const entryContainer = document.querySelector("[pokedex-entry-cards-container]")
const searchInput = document.querySelector("[data-search]")

let pokedex = []

searchInput.addEventListener("input", e => {
   const value = e.target.value.toLowerCase()
   pokedex.forEach(entry => {
      // console.log(entry);
      const isVisible =
         entry.name.toLowerCase().includes(value) ||
         entry.body.toLowerCase().includes(value)
      entry.element.classList.toggle("hide", !isVisible)
   })
})

async function getData() {
   // const rees = await sql(`
   //    with recursive entwicklung as (
   //    select *, 0 as evolution level )
   //    select * from pokemon_blueprint`)
   const res = await sql(`select * from pokemon_blueprint`)
   // console.log("get",res);
   return res
}

async function createCards() {
   const pokemon = await getData()
   pokedex = pokemon.map(async pokemon_blueprint =>{
      const card = pokedexTemplate.content.cloneNode(true).children[0]
      const icon = card.querySelector("[entry-icon]")
      const header = card.querySelector("[entry-name]")
      const body = card.querySelector("[entry-body]")
      const imageURL = (await (await fetch("/api/imageURL/" + pokemon_blueprint.ID)).json()).imageURL
      icon.src = imageURL
      header.textContent = pokemon_blueprint.name
      body.textContent = pokemon_blueprint.ID
      entryContainer.append(card)
      // console.log(card);
      return { name: pokemon_blueprint.name, body: pokemon_blueprint.ID+"", element: card }
   })
}

await createCards()