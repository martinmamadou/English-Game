const div = document.querySelectorAll('main > div');
const suivant = document.querySelector('#suivant');
const finishDiv = document.querySelector('.finish');
const nextSet = document.querySelector('#restart');
const endGame = document.querySelector('.end');
const follow = document.querySelector('.continue')
let set = 0
let currentIndex = 0;

let timerDefaults = [];

div.forEach((elm, index) => {
  if (index !== 0) elm.classList.add('hidden');

  const timerElement = elm.querySelector('.timer');
  if (timerElement) {
    timerDefaults.push(timerElement.textContent);
  }
  console.log(timerDefaults)
});

let timerRunning = false;
let timerInterval = null;

function startTimer() {
  const currentStep = div[currentIndex];
  const timerElement = currentStep.querySelector('.timer');
  if (!timerElement || currentStep.classList.contains('hidden')) return; // Si aucun timer ou si la div est cachée, on quitte

  let timeLeft = parseInt(timerElement.textContent); // Récupérer la durée à partir de l'élément <p class="timer">
  timerElement.textContent = `${timeLeft}s`; // Afficher la durée initiale

  timerRunning = true; // Marquer que le timer est en cours

  // Démarrer le timer avec un intervalle
  timerInterval = setInterval(() => {
    // Vérifier si la div est toujours visible avant de continuer
    if (currentStep.classList.contains('hidden')) {
      clearInterval(timerInterval); // Arrêter le timer si la div est cachée
      timerRunning = false; // Marquer que le timer n'est plus en cours
      return;
    }

    timeLeft--;
    timerElement.textContent = `${timeLeft}s`; // Mettre à jour le timer chaque seconde
    if (timeLeft <= 0) {
      clearInterval(timerInterval); // Arrêter le timer quand il atteint zéro
      timerRunning = false; // Marquer que le timer est terminé
      showNext(); // Avancer à l'étape suivante une fois le timer terminé
    }
  }, 1000); // Exécuter chaque seconde
}

function showNext() {
  const currentStep = div[currentIndex];
  console.log(currentStep); 
    if (currentIndex < div.length - 2) {
    currentStep.classList.add('hidden');
    currentIndex++;
    const nextStep = div[currentIndex];
    nextStep.classList.remove('hidden');
    const timerElement = nextStep.querySelector('.timer');
    if (timerElement) {
      // Réinitialiser la valeur du timer à la valeur enregistrée dans timerDefaults
      timerElement.textContent = timerDefaults[currentIndex];
      console.log(timerElement)
      // Démarrer le timer si l'étape suivante en a un
      startTimer();
    }
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
        const firstTimerElement = div[currentIndex].querySelector('.timer');
        
            firstTimerElement.textContent = timerDefaults[currentIndex];  // Remettre le timer à sa valeur par défaut
            startTimer()
        
    } else {
        follow.classList.add('hidden')
      endGame.classList.remove('hidden')
      console.log("Terminé pour 2 sets")
    }
    console.log(currentIndex, set);
}

startTimer();
nextSet.addEventListener('click', restart)
suivant.addEventListener('click', showNext);

/*let div = document.querySelectorAll('main > div');
const suivant = document.querySelector('#suivant');
const finishDiv = document.querySelector('.finish');
const nextSet = document.querySelector('#restart');
const endGame = document.querySelector('.end');
const follow = document.querySelector('.continue');
let set = 0;
let currentIndex = 0;

// Tableau pour stocker les valeurs par défaut des timers
let timerDefaults = [];

// Initialiser les étapes, en masquant toutes sauf la première
div.forEach((elm, index) => {
  if (index !== 0) {
    elm.classList.add('hidden');
  }

  // Enregistrer la valeur initiale du timer (si elle existe)
  const timerElement = elm.querySelector('.timer');
  if (timerElement) {
    timerDefaults.push(timerElement.textContent);
  }
});

// Variable pour suivre l'état du timer
let timerRunning = false;
let timerInterval = null;

// Fonction pour démarrer un timer à partir de l'élément <p class="timer">
function startTimer() {
  const currentStep = div[currentIndex];
  const timerElement = currentStep.querySelector('.timer');
  if (!timerElement || currentStep.classList.contains('hidden')) return; // Si aucun timer ou si la div est cachée, on quitte

  let timeLeft = parseInt(timerElement.textContent); // Récupérer la durée à partir de l'élément <p class="timer">
  timerElement.textContent = `${timeLeft}s`; // Afficher la durée initiale

  timerRunning = true; // Marquer que le timer est en cours

  // Démarrer le timer avec un intervalle
  timerInterval = setInterval(() => {
    // Vérifier si la div est toujours visible avant de continuer
    if (currentStep.classList.contains('hidden')) {
      clearInterval(timerInterval); // Arrêter le timer si la div est cachée
      timerRunning = false; // Marquer que le timer n'est plus en cours
      return;
    }

    timeLeft--;
    timerElement.textContent = `${timeLeft}s`; // Mettre à jour le timer chaque seconde
    if (timeLeft <= 0) {
      clearInterval(timerInterval); // Arrêter le timer quand il atteint zéro
      timerRunning = false; // Marquer que le timer est terminé
      showNext(); // Avancer à l'étape suivante une fois le timer terminé
    }
  }, 1000); // Exécuter chaque seconde
}

// Fonction pour avancer à l'étape suivante
function showNext() {
  const currentStep = div[currentIndex];
  console.log(currentStep);

  if (currentIndex < div.length - 1) {
    currentStep.classList.add('hidden'); // Masquer l'étape actuelle
    currentIndex++; // Passer à l'étape suivante
    const nextStep = div[currentIndex];
    nextStep.classList.remove('hidden'); // Afficher la nouvelle étape

    // Réinitialiser le texte du timer à sa valeur initiale avant de démarrer le nouveau timer
    const timerElement = nextStep.querySelector('.timer');
    if (timerElement) {
      // Réinitialiser la valeur du timer à la valeur enregistrée dans timerDefaults
      timerElement.textContent = timerDefaults[currentIndex];
      // Démarrer le timer si l'étape suivante en a un
      startTimer();
    }
  } else {
    currentStep.classList.add('hidden');
    suivant.classList.add('hidden');
    finishDiv.classList.remove('hidden');
    set++;
    console.log("set :", set);
  }

  // Vérifier si le nombre de sets est égal à 2
  if (set === 2) {
    follow.classList.add('hidden');
    endGame.classList.remove('hidden'); // Afficher l'écran de fin de jeu
    console.log("Jeu terminé!");
  }
}

// Fonction pour redémarrer le jeu
function restart() {
  if (set < 2) {
    currentIndex = 0;
    div.forEach((elm) => elm.classList.add('hidden'));  // Masquer toutes les étapes
    div[currentIndex].classList.remove('hidden');  // Afficher la première étape
    suivant.classList.remove('hidden');  // Montrer le bouton "Suivant"
    finishDiv.classList.add('hidden');  // Cacher l'écran de fin

    // Réinitialiser tous les timers à leur valeur par défaut enregistrée
    div.forEach((step, index) => {
      const timerElement = step.querySelector('.timer');
      if (timerElement) {
        timerElement.textContent = timerDefaults[index];  // Réinitialiser le texte du timer
      }
    });

    // Démarrer le timer pour la première étape après avoir tout réinitialisé
    startTimer();  // Démarrer le premier timer
  } else {
    follow.classList.add('hidden');
    endGame.classList.remove('hidden'); // Afficher l'écran de fin de jeu
    console.log("Terminé pour 2 sets");
  }
  console.log(currentIndex, set);
}

// Écouter les événements de clic pour avancer à l'étape suivante ou redémarrer
nextSet.addEventListener('click', restart);
suivant.addEventListener('click', showNext);

// Démarrer le timer pour la première étape (automatiquement après le chargement)
startTimer();
*/