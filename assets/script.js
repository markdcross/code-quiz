//* Timer vars
let countdown;
const highscoreBtn = document.getElementById('highscoreBtn');
const timerDisplay = document.getElementById('timeLeft');
const startBtn = document.getElementById('startBtn');
const welcomeEl = document.getElementById('welcome');
const instructionsEl = document.getElementById('instructions');

//* Timer functionality
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
            clearInterval(countdown);
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
    console.log(display);
}

// Use a button to start the timer
function startTimer() {
    const seconds = 60;
    timer(seconds);
}

//* DOM functions
//Removes an element from the document
function removeElement(elementId) {
    elementId.remove();
}

// Adds an element to the document
function addElement(parentId, elementTag, elementId, html) {
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById('progress');
    element.innerHTML =
        'Question ' + currentQuestionNumber + ' of ' + quiz.questions.length;
}

// TODO: Set the content of relevant elements
var progressBar = '<p>Question x of y</p>';
var answerA =
    '<button type="button" class="btn btn-danger answerBtn" id="answerABtn">' +
    'Answer A' +
    '</button>';
var answerB =
    '<button type="button" class="btn btn-danger answerBtn" id="answerBBtn">' +
    'Answer B' +
    '</button>';
var answerC =
    '<button type="button" class="btn btn-danger answerBtn" id="answerCBtn">' +
    'Answer C' +
    '</button>';
// TODO: Style all created elements

//* Event listeners
// TODO: Append all created/removed elements as event listener functions
startBtn.addEventListener('click', function () {
    startTimer();
    removeElement(startBtn);
    removeElement(welcomeEl);
    removeElement(instructionsEl);
    addElement('questionTracker', 'p', 'progress', progressBar);
    addElement('titleDiv', 'div', 'questionDiv', 'This is the questionDiv');
    addElement('introDiv', 'div', 'answerDiv', answerA);
    addElement('introDiv', 'div', 'answerDiv', answerB);
    addElement('introDiv', 'div', 'answerDiv', answerC);
    addElement('startDiv', 'div', 'popupDiv', 'This is the popupDiv');
});

// popupDiv.addEventListener('click', function () {
//     removeElement(questionDiv);
//     removeElement(answerDiv);
//     removeElement(popupDiv);
// addElement('titleDiv', 'div', 'questionDiv', 'This is the questionDiv');
// addElement('titleDiv', 'div', 'answerDiv', 'This is the answerDiv');
// addElement('titleDiv', 'div', 'popupDiv', 'This is the popupDiv');
// });

// TODO: Create all necessary elements
const answerDiv = document.createElement('div');
const popupDiv = document.createElement('div');
