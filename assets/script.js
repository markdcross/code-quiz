// Timer vars
let countdown;
const timerDisplay = document.getElementById('timeLeft');
const startBtn = document.getElementById('startBtn');

// Timer functionality
function timer(seconds) {
    // Clear any existing timers
    clearInterval(countdown);
    // Current time stamp in milliseconds
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    // Find and display the time left every second
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // Check if we should stop it
        if (secondsLeft < 0) {
            clearInterval(coundown);
            return;
        }
        // Display it
        displayTimeLeft(secondsLeft);
    }, 1000);
}

// Display the timer
function displayTimeLeft(seconds) {
    // Set minutes left
    const minutes = Math.floor(seconds / 60);
    // Set seconds left in the minute
    const remainderSeconds = seconds % 60;
    // Display
    const display = `${minutes}:${
        remainderSeconds < 10 ? '0' : ''
    }${remainderSeconds}`;
    // Adds the timer as the page title (in tab)
    document.title = display;
    // Displays the timer
    timerDisplay.textContent = display;
}

// Use a button to start the timer
function startTimer() {
    const seconds = 60;
    timer(seconds);
}

// Event listeners
startBtn.addEventListener('click', startTimer);
