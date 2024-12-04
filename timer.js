document.querySelector('.increase').addEventListener('click', function() {
    const input = document.querySelector('.number-field');
    console.log(input)
    let currentValue = parseInt(input.value) || 3; // Valeur par défaut
    if (currentValue < 8) {
      input.value = currentValue + 1;
    }
  });
  
  document.querySelector('.decrease').addEventListener('click', function() {
    const input = document.querySelector('.number-field');
    let currentValue = parseInt(input.value) || 3;
    if (currentValue > 3) {
      input.value = currentValue - 1;
    }
  });