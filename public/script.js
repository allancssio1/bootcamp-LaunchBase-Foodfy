// peges exposed/index and exoised/recipes >>>>
const cards = document.querySelectorAll('.card')
for(let card of cards){
    card.addEventListener('click', function () {
        const idCard = card.getAttribute('id')
        window.location.href = `/exposed/${idCard}`
    } )
}
// page admin/recipes/create and admin/recipes/edit >>>>
function addIngredient () {
    const ingredients = document.querySelector('#ingredients')
    const ingredient = document.querySelectorAll('#ingredients input')
    const newIngredient = ingredient[ingredient.length - 1].cloneNode(true)
    if (newIngredient.value == "") return false     
    newIngredient.value = ""
    ingredients.appendChild(newIngredient)
}
function addPreparation () {
    const preparations = document.querySelector('#preparations')
    const preparation =  document.querySelectorAll('#preparations input')
    const newPreparation = preparation[preparation.length - 1].cloneNode(true)
    if(newPreparation.value == "") return false
    newPreparation.value = ""
    preparations.appendChild(newPreparation)   
}
document.querySelector('.add-ingredient').addEventListener('click', addIngredient)
document.querySelector('.add-preparation').addEventListener('click', addPreparation)

// page admin/recipes/edit button delete >>>>
const currentPage = location.pathname
const formDelete = document.querySelector('#form-delete')

formDelete.addEventListener('submit', function (event) {
    const confirmation = confirm('Deseja excluir?')
    if (!confirmation) {
        event.preventDefault()
    }
})

// pages exposed/show and admin/recipes/show >>>>
const buttomIngredient = document.querySelector('.buttom-ingredient')
const buttomPreparation = document.querySelector('.buttom-preparation')
const buttomInformation = document.querySelector('.buttom-information')
const ingredients = document.querySelectorAll('.content-ingredient')
const preparations = document.querySelectorAll('.content-preparation')
const informations = document.querySelector('.content-information')

function mostrar (element) {
    if (element == 'Esconder') {
      return true
    }
}
function esconder (element) {
    if (element == 'Mostrar') {
        return true
    }
}

buttomIngredient.addEventListener('click', function () {
    if (mostrar (buttomIngredient.innerHTML) == true) {
        buttomIngredient.innerHTML = 'Mostrar'
        for (const ingredient of ingredients) {
            ingredient.classList.add('no-display')
        }
    }else if( esconder (buttomIngredient.innerHTML) == true){
        buttomIngredient.innerHTML = 'Esconder'
        for (const ingredient of ingredients) {
            ingredient.classList.remove('no-display')
        }
    }
})

buttomPreparation.addEventListener('click', function () {
    if (mostrar (buttomPreparation.innerHTML) == true) {
        buttomPreparation.innerHTML = 'Mostrar'
        for (const preparation of preparations) {
            preparation.classList.add('no-display')
        }
    }else if( esconder (buttomPreparation.innerHTML) == true){
        buttomPreparation.innerHTML = 'Esconder'
        for (const preparation of preparations) {
            preparation.classList.remove('no-display')
        }
    }
})

buttomInformation.addEventListener('click', function () {
    if (mostrar (buttomInformation.innerHTML) == true) {
        buttomInformation.innerHTML = 'Mostrar'
        informations.classList.add('no-display')
    }else if( esconder (buttomInformation.innerHTML) == true){
        buttomInformation.innerHTML = 'Esconder'
        informations.classList.remove('no-display')
    }
})