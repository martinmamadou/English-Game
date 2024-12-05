const button = document.querySelector('.modalOpener');
const modal = document.querySelector('.modal')

console.log(modal)

button.addEventListener("click", ()=>{
    if(modal.classList.contains('hidden')){
       modal.classList.remove('hidden') 
       button.textContent = 'Close'
    } else {
        modal.classList.add('hidden')
        button.textContent= 'Rules'
    }
})