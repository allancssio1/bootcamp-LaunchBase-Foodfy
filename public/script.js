const { all } = require("../routes")

const cards = document.querySelectorAll('.card')

for(let card of cards){
    card.addEventListener('click', function () {
        const idCard = card.getAttribute('id')
        window.location.href = `/exposed/${idCard}`
    } )
}

function addIngredient() {
    const ingredients = document.querySelector('#ingredients')
    const ingredient = document.querySelectorAll('#ingredients input')
    
    const newIngredient = ingredient[ingredient.length - 1].cloneNode(true)

    if (newIngredient.value == "") return false     
    
    newIngredient.value = ""
    ingredients.appendChild(newIngredient)
}
function addPreparation() {
    const preparations = document.querySelector('#preparations')
    const preparation = document.querySelectorAll('#preparations input')
    const newPreparation = preparation[preparation.length - 1].cloneNode(true)

    if(newPreparation.value == "") return false

    newPreparation.value = ""
    preparations.appendChild(newPreparation)
    
}
document.querySelector('.add-ingredient').addEventListener('click', addIngredient)

document.querySelector('.add-preparation').addEventListener('click', addPreparation)