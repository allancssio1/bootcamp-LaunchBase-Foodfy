const modalOverlay = document.querySelector('.modalOverlay')
const cards = document.querySelectorAll('.card')

for(let card of cards){
    card.addEventListener("click", function(){
        
        const cardId = card.getAttribute('id')
        const titleLegend = card.querySelector('.subTitle').innerHTML
        const author = card.querySelector('.author').innerHTML 

        modalOverlay.classList.add("active")
        modalOverlay.querySelector('img').src = cardId
        modalOverlay.querySelector('.titleLegend').innerHTML = titleLegend
        modalOverlay.querySelector('.authorLegend').innerHTML = author
    })
}

document.querySelector('.closeModal').addEventListener("click", function(){
    modalOverlay.classList.remove("active")
    
})