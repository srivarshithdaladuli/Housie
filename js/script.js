let generatedNumbers = [];
let allNumbers = Array.from({ length: 90 }, (_, i) => i + 1); // Numbers 1-90
let numberGrid = document.getElementById('number-grid');
let currentNumberDisplay = document.getElementById('current-number');
let historyList = document.getElementById('history-list');

// Initialize the number grid (1-90)
function createNumberGrid() {
  numberGrid.innerHTML = ''; // Clear any existing grid
  for (let i = 1; i <= 90; i++) {
    let numberElement = document.createElement('div');
    numberElement.classList.add('number');
    numberElement.id = `num-${i}`;
    numberElement.innerText = i;
    numberGrid.appendChild(numberElement);
  }
}

// Generate a random number
function generateNumber() {
  if (allNumbers.length === 0) {
    alert("All numbers have been generated!");
    return;
  }

  // Get random index from remaining numbers
  let randomIndex = Math.floor(Math.random() * allNumbers.length);
  let number = allNumbers[randomIndex];

  // Remove selected number from available numbers
  allNumbers.splice(randomIndex, 1);

  // Add number to history
  generatedNumbers.push(number);

  // Highlight the newly generated number
  highlightNumber(number);

  // Display the current generated number on the right side
  displayCurrentNumber(number);

  // Update history display
  updateHistory();
}

// Highlight the current number as red, previous ones green
function highlightNumber(currentNumber) {
  // Reset all numbers to default (lightgray)
  document.querySelectorAll('.number').forEach(num => num.classList.remove('green', 'red'));

  // Highlight all previous numbers as green
  generatedNumbers.forEach(num => {
    document.getElementById(`num-${num}`).classList.add('green');
  });

  // Highlight the current number as red
  document.getElementById(`num-${currentNumber}`).classList.add('red');
}

// Show history of generated numbers
function updateHistory() {
  // Clear the history display
  historyList.innerHTML = '';

  // Add all generated numbers to the history list
  generatedNumbers.forEach(num => {
    const span = document.createElement('span');
    span.innerText = num;
    historyList.appendChild(span);
  });
}

// Display only the current generated number on the right
function displayCurrentNumber(number) {
  currentNumberDisplay.innerText = number;  // Show current number in bold and large
}

// Reset the game
function resetGame() {
  // Reset arrays
  generatedNumbers = [];
  allNumbers = Array.from({ length: 90 }, (_, i) => i + 1);

  // Reset the grid
  createNumberGrid();

  // Clear the current number display and history list
  currentNumberDisplay.innerText = "";
  historyList.innerHTML = "";

  alert("Game has been reset!");
}

// Initialize the grid on page load
window.onload = function () {
  createNumberGrid();
}
