const cards = document.querySelectorAll('.card')
const buttomIngredient = document.querySelector('.buttom-ingredient')
const buttomPreparation = document.querySelector('.buttom-preparation')
const buttomInformation = document.querySelector('.buttom-information')
const ingredients = document.querySelectorAll('.content-ingredient')
const preparations = document.querySelectorAll('.content-preparation')
const informations = document.querySelectorAll('.content-information')


for(let card of cards){
    card.addEventListener('click', function(){
        const idCard = card.getAttribute('id')
        window.location.href = `/recipe/${idCard}`
    } )
}

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
        for (const information of informations) {
            information.classList.add('no-display')
        }
    }else if( esconder (buttomInformation.innerHTML) == true){
        buttomInformation.innerHTML = 'Esconder'
        for (const information of informations) {
            information.classList.remove('no-display')
        }
    }
})