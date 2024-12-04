// Définitions des constantes et sélections d'éléments DOM
const div = document.querySelectorAll("main > div");
const suivant = document.querySelector("#suivant");
const finishDiv = document.querySelector(".finish");
const nextSet = document.querySelector("#restart");
const endGame = document.querySelector(".end");
const follow = document.querySelector(".continue");
const level = document.querySelector(".level");
const cardImg = document.querySelectorAll(".gameImage");
const briefTime = document.querySelector('.Brief > .timer');
const gameBG = document.querySelector('.game')
const cardType = [
  { name: "easy", icon: "facile.png", time: 60, color: '#3a2665'},
  { name: "medium", icon: "esprit.png", time: 40 , color:'#ed6d1d'},
  { name: "hard", icon: "main.png", time: 20, color: '#f6c543'},
  { name: "very hard", icon: "bmx.png", time: 10, color: '#336c66'},
];

 
// Variables de contrôle
let set = 0;
let currentIndex = 0;
let timerDefaults = [];
let timerRunning = false;
let timerInterval = null;
let playersFinishedBriefing = 0; // Compteur de joueurs ayant terminé leur briefing
let i = 0
let playerTimers = []; // Tableau pour stocker les timers des joueurs


function updateSetViewer(setNumber) {
  const setViewer = finishDiv.firstElementChild; // Sélectionne le premier enfant de finishDiv
  const displaySet = setNumber >= 0 && setNumber <= 3 ? setNumber + 1 : setNumber;

  if (setNumber === 3) {
    // Si c'est le dernier set (set 4), affiche un message spécial
    setViewer.innerHTML = `Congratulation! <br> You completed all rounds!`;
  } else {
    // Sinon, affiche normalement l'état du set
    setViewer.innerHTML = `Round ${displaySet} <br> Completed!`;
  }
}



// Déclaration de la variable globale pour le timer
let globalTimerValue = 0;



// Fonction pour obtenir une carte aléatoire
function getRandomCard() {
  const selectedCardIndex = Math.floor(Math.random() * cardType.length);
  return cardType[selectedCardIndex];
}

// Fonction pour afficher la carte (modifiée pour ne pas retourner une valeur)
function displayCard() {
  
  const selectedCard = getRandomCard();
  console.log(selectedCard); // Afficher la carte pour vérification

  level.textContent = selectedCard.name; // Afficher le nom de la carte
  const timer = document.querySelector(".Draw > .timer");

  globalTimerValue = parseInt(selectedCard.time); // Affecter la valeur du timer
  console.log(globalTimerValue); // Afficher la valeur du timer pour vérification

  timer.innerHTML = globalTimerValue; // Mettre à jour le DOM avec le timer
  cardImg.forEach((elm) => {
    elm.src = selectedCard.icon; 
  }); // Mettre à jour l'icône de la carte

  gameBG.style.backgroundColor = selectedCard.color

  return globalTimerValue; // Retourner la valeur du timer
}

displayCard();

// Initialisation des étapes et stockage des valeurs par défaut des timers
div.forEach((elm, index) => {
  if (index !== 0) elm.classList.add("hidden");
  const timerElement = elm.querySelector(".timer");

  let timerValue = globalTimerValue; // Valeur par défaut de 10

  if (timerElement) {
    const rawValue = timerElement.textContent.trim(); // Récupère la valeur brute du timer
    const parsedValue = parseInt(rawValue);

    // Si la valeur récupérée est un nombre valide, on l'attribue
    if (!isNaN(parsedValue)) {
      timerValue = parsedValue;
    }
  }

  timerDefaults.push(timerValue); // Ajoute la valeur du timer (ou la valeur par défaut)
});

// Fonction pour démarrer un timer
function startTimer() {
  clearInterval(timerInterval)
  const currentStep = div[currentIndex];
  const timerElement = currentStep.querySelector(".timer");
  if (!timerElement || currentStep.classList.contains("hidden")) return;

  let timeLeft = 0;

  
  // Si c'est l'étape de briefing, on utilise le temps fixe de 30s
  if (currentStep.classList.contains("Brief")) {
    console.log(playerName)
    const playerBrief = document.querySelector('.player')
    let Currentplayer = playerName[i]
    playerBrief.textContent = Currentplayer.name
    timeLeft = 1; // Temps fixe de 30 secondes
    timerElement.textContent = `${timeLeft}s`;
  } else {
    timeLeft = parseInt(timerElement.textContent);
  }

  timerRunning = true;

  timerInterval = setInterval(() => {
    if (currentStep.classList.contains("hidden")) {
      clearInterval(timerInterval);
      timerRunning = false;
      return;
    }

    timeLeft--;
    if (isNaN(timeLeft)) {
      timeLeft = 0; // Fix NaN propagation
    }
    timerElement.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;

      // Si on est dans l'étape de briefing, on ne passe pas encore à la suivante
      if (currentStep.classList.contains("Brief")) {
        playersFinishedBriefing++;
        i++
        if (playersFinishedBriefing === players) {
          showNext(); // Tout le monde a fini le briefing, on passe à l'étape suivante
        } else {
          console.log('on est la')
          timeLeft = 10
          startTimer()
        }
      } else {
        showNext();
      }
      
      console.log('weeeee', i)
      console.log(playersFinishedBriefing)
    }
    
  }, 1000);
}
console.log('ycccc', playersFinishedBriefing)


// Fonction pour afficher l'étape suivante
function showNext() {
  const currentStep = div[currentIndex];

  if (currentIndex < div.length - 2) {
    currentStep.classList.add("hidden");
    currentIndex++;
    const nextStep = div[currentIndex];
    nextStep.classList.remove("hidden");

    const timerElement = nextStep.querySelector(".timer");
    if (timerElement) {
      const defaultTime = timerDefaults[currentIndex];
      timerElement.textContent = isNaN(defaultTime) ? "0s" : `${defaultTime}s`;
      startTimer();
    }
  } else {
    currentStep.classList.add("hidden");
    suivant.classList.add("hidden");
    finishDiv.classList.remove("hidden");

    updateSetViewer(set);
    set++;
  }

  if (set === 4) {
    follow.classList.add("hidden");
    endGame.classList.remove("hidden");
  }
}

// Fonction pour redémarrer le jeu
function restart() {
  playersFinishedBriefing = 0; // Réinitialise le compteur de joueurs ayant terminé le briefing
  i = 0;
  if (set < 4) {
    currentIndex = 0;
    div.forEach((elm) => elm.classList.add("hidden"));
    div[currentIndex].classList.remove("hidden");
    suivant.classList.remove("hidden");
    finishDiv.classList.add("hidden");

    displayCard(); // Régénérer une carte aléatoire

    div.forEach((step, index) => {
      const timerElement = step.querySelector(".timer");
      if (timerElement) {
        const defaultTime = timerDefaults[index];
        timerElement.textContent = isNaN(defaultTime)
          ? "0s"
          : `${defaultTime}s`;
      }
    });

    playersFinishedBriefing = 0; // Réinitialiser le compteur des joueurs ayant terminé le briefing
    startTimer();
  } else {
    follow.classList.add("hidden");
    endGame.classList.remove("hidden");
  }
}

// Initialisation et gestion des événements
console.log(globalTimerValue);
startTimer();

let players = 0; // Valeur par défaut au cas où aucun paramètre n'est fourni

window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    players = parseInt(params.get('players')) || players; // Récupère et met à jour 'players' ou garde 3 par défaut

    // Démarrer la boucle avec la valeur dynamique
    initializePlayers();
   
};

const playerName = [];
function initializePlayers() {
    let i = 0;
    while (i < players) {
      
        const player = {
          name: `Player ${i + 1}`,
          briefTime: 30 // Temps fixe de 30 secondes pour chaque joueur
        };
        playerName.push(player)
        console.log(player)
        i++;
    }
    return playerName;
}

initializePlayers();
console.log(playerName)


nextSet.addEventListener("click", restart);
suivant.addEventListener("click", showNext);
