// Définitions des constantes et sélections d'éléments DOM
const div = document.querySelectorAll("main > div");
const suivant = document.querySelector("#suivant");
const finishDiv = document.querySelector(".finish");
const nextSet = document.querySelector("#restart");
const endGame = document.querySelector(".end");
const follow = document.querySelector(".continue");
const level = document.querySelector(".level");
const cardImg = document.querySelectorAll(".gameImage");

const cardType = [
  { name: "easy", icon: "facile.png", time: 60 },
  { name: "medium", icon: "esprit.png", time: 40 },
  { name: "hard", icon: "main.png", time: 20 },
  { name: "very hard", icon: "bmx.png", time: 10 },
];

// Variables de contrôle
let set = 0;
let currentIndex = 0;
let timerDefaults = [];
let timerRunning = false;
let timerInterval = null;

// Déclaration de la variable globale pour le timer
let globalTimerValue = 0;

// Fonction pour obtenir une carte aléatoire
function getRandomCard() {
  const selectedCardIndex = Math.floor(Math.random() * cardType.length);
  return cardType[selectedCardIndex];
}

// Fonction pour afficher la carte (modifiée pour ne pas retourner une valeur)
// Fonction pour afficher la carte et récupérer le timer
function displayCard() {
  const selectedCard = getRandomCard();
  console.log(selectedCard); // Afficher la carte pour vérification

  level.textContent = selectedCard.name; // Afficher le nom de la carte
  const timer = document.querySelector(".Draw > .timer");

  globalTimerValue = parseInt(selectedCard.time); // Affecter la valeur du timer
  console.log(globalTimerValue); // Afficher la valeur du timer pour vérification

  timer.innerHTML = globalTimerValue; // Mettre à jour le DOM avec le timer
  cardImg.forEach((elm)=>{
    elm.src = selectedCard.icon; 
  })// Mettre à jour l'icône de la carte

  return globalTimerValue; // Retourner la valeur du timer
}

displayCard();

console.log(globalTimerValue);

// Initialisation des étapes et stockage des valeurs par défaut des timers
div.forEach((elm, index) => {
  if (index !== 0) elm.classList.add("hidden");
  const timerElement = elm.querySelector(".timer");

  let timerValue = globalTimerValue// Valeur par défaut de 10

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
  const currentStep = div[currentIndex];
  const timerElement = currentStep.querySelector(".timer");
  if (!timerElement || currentStep.classList.contains("hidden")) return;

  let timeLeft = parseInt(timerElement.textContent);
  if (isNaN(timeLeft)) {
    timeLeft = 0; // Valeur par défaut si NaN
  }

  timerElement.textContent = `${timeLeft}s`;
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
      showNext();
    }
  }, 1000);
}

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
    set++;
  }

  if (set === 2) {
    follow.classList.add("hidden");
    endGame.classList.remove("hidden");
  }
}

// Fonction pour redémarrer le jeu
function restart() {
  if (set < 2) {
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

    startTimer();
  } else {
    follow.classList.add("hidden");
    endGame.classList.remove("hidden");
  }
}

// Initialisation et gestion des événements


console.log(globalTimerValue);
startTimer();

nextSet.addEventListener("click", restart);
suivant.addEventListener("click", showNext);
