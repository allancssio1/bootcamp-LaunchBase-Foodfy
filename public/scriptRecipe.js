const buttoms = document.querySelectorAll('.buttom')
const ingredients = document.querySelectorAll('.content-ingredient')
const preparations = document.querySelectorAll('.content-preparation')
const informations = document.querySelectorAll('.content-information')

function verificar (element) {
  if (element === 'Esconder') {
    return true
  }
  else {
    return false
  }
}

// for(let buttom of buttoms){
//   buttoms[0].addEventListener('click', function () {
//     if (verificar(buttoms[0].innerHTML) == true) {
//       buttoms[0].innerHTML = 'Mostrar'
//       for (let ingredient of ingredients) {
//         ingredient.classList.add('no-display')
//       }
//     }
//      else if(verificar(buttoms[0].innerHTML) == false){
//        buttoms[0].innerHTML = 'Esconder'
//       for (let ingredient of ingredients) {
//         ingredient.classList.remove('no-display')
//       }
//      }
//   })
// }
for(let buttom of buttoms){
  buttoms[1].addEventListener('click', function () {
    if (verificar(buttoms[1].innerHTML) == true) {
      buttoms[1].innerHTML = 'Mostrar'
      console.log(buttoms[0]);
      
      // for (let preparation of preparations) {
      //   preparation.classList.add('no-display')
      // }
    }else if(verificar(buttoms[1].innerHTML) == false){
      buttoms[1].innerHTML = 'Esconder'
      // console.log(buttoms[1]);
      // for (let preparation of preparations) {
      //   preparation.classList.remove('no-display')
      // }
    }
  })
}