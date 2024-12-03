const div = document.querySelectorAll('main > div');
const suivant = document.querySelector('#suivant');
const finishDiv = document.querySelector('.finish');
const nextSet = document.querySelector('#restart');
const endGame = document.querySelector('.end');
const follow = document.querySelector('.continue')
let set = 0
let currentIndex = 0;



div.forEach((elm, index) => {
  if (index !== 0) elm.classList.add('hidden');
});

function showNext() {
  const currentStep = div[currentIndex];
  console.log(currentStep);

 
    if (currentIndex < div.length - 2) {
    currentStep.classList.add('hidden');
    currentIndex++;
    const nextStep = div[currentIndex];
    nextStep.classList.remove('hidden');
    startTimerIfPresent(currentStep)
  } else {
    currentStep.classList.add('hidden')
    suivant.classList.add('hidden');
    finishDiv.classList.remove('hidden');
    set++
    console.log("set :", set)
  }

  if(set==2){
    follow.classList.add('hidden')
    endGame.classList.remove('hidden')
  }
 
  
}

function restart() {
    if(set<2) {
        currentIndex = 0;
        div.forEach((elm) => elm.classList.add('hidden'));
        div[currentIndex].classList.remove('hidden');
        suivant.classList.remove('hidden');
        finishDiv.classList.add('hidden');
    } else {
        follow.classList.add('hidden')
      endGame.classList.remove('hidden')
      console.log("Terminé pour 2 sets")
    }
    console.log(currentIndex, set);
}


nextSet.addEventListener('click', restart)
suivant.addEventListener('click', showNext);