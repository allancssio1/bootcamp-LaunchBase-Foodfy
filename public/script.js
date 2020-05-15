const cards = document.querySelectorAll('.card')

for(let card of cards){
    card.addEventListener('click', function(){
        const idCard = card.getAttribute('id')
        window.location.href = `/recipes/${idCard}`
    } )
}