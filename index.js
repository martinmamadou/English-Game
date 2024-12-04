const button = document.querySelector('.modalOpener');
const modal = document.querySelector('.modal')

console.log(modal)

button.addEventListener("click", ()=>{
    modal.classList.toggle('hidden')
})