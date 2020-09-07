const cards = document.querySelectorAll('.card')
const addIngredient = document.querySelector('add-ingredient') 

for(let card of cards){
    card.addEventListener('click', function () {
        const idCard = card.getAttribute('id')
        window.location.href = `/recipe/${idCard}`
    } )
}

addIngredient.addEventListener('click', function () {
    const ingredients = document.querySelector('#ingredients')
    const ingredient = document.querySelectorAll('.ingredient')

    const newIngredient = ingredient[ingredient.length - 1].cloneNode(true)

    if (newIngredient.children[0].value == "") return false
    
    newIngredient.children[0].value = ""
    ingredients.appendChild(newIngredient)
    console.log(ingredients)
})