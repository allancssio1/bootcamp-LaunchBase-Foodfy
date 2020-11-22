const cards = document.querySelectorAll('.card')
const currentPage = location.pathname
const formDelete = document.querySelector('#form-delete')
const chefsAdmin = document.querySelectorAll('.chef.item a')
const chefsUser = document.querySelectorAll('.card_chef')
const navegationsAdmin = document.querySelectorAll('#header-admin a')
const navegationsUser = document.querySelectorAll('.navegacao a')

for (let item of navegationsAdmin) {
  if(currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('adminActive')
  }
}

for (let item of navegationsUser) {
  if(currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('userActive')
  }
}

for(let card of cards){
  card.addEventListener('click', function () {
    const idCard = card.getAttribute('id')
    window.location.href = `/recipes/${idCard}`
  })
}

if (chefsAdmin) {
  for (let chef of chefsAdmin) {
    const idChef = chef.getAttribute('id')
    window.location.href = `/admin/chefs/${idChef}`
  }  
}

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

formDelete.addEventListener('submit', function (event) {
  const confirmation = confirm('Deseja excluir?')
  if (!confirmation) {
    event.preventDefault()
  }
})