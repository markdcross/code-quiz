//* Timer vars
let countdown;
let secondsLeft;
let score;
const highscoreBtn = document.getElementById('highscore-btn');
const timerDisplay = document.getElementById('timeLeft');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerEl = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerBtnsEl = document.getElementById('answer-btns');
let shuffledQuestions;
let currentQuestionIndex;

//* START THE GAME
function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    setNextQuestion();
}

//* PLAY THE GAME
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerBtnsEl.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerBtnsEl.firstChild) {
        answerBtnsEl.removeChild(answerBtnsEl.firstChild);
    }
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerBtnsEl.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

//* TIME THE GAME
function timer(seconds) {
    // Clear any existing timers
    clearInterval(countdown);
    // Current time stamp in milliseconds
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    // Find and display the time left every second
    countdown = setInterval(() => {
        secondsLeft = Math.round((then - Date.now()) / 1000);
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

//* END THE GAME

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

//* Questions
const questions = [
    {
        question: 'First question',
        answers: [
            { text: 'First answer', correct: true },
            { text: 'Second answer', correct: false },
            { text: 'Third answer', correct: false },
            { text: 'Fourth answer', correct: false },
        ],
    },

    {
        question: 'Second question',
        answers: [
            { text: 'First answer', correct: true },
            { text: 'Second answer', correct: false },
            { text: 'Third answer', correct: false },
            { text: 'Fourth answer', correct: false },
        ],
    },

    {
        question: 'Third question',
        answers: [
            { text: 'First answer', correct: true },
            { text: 'Second answer', correct: false },
            { text: 'Third answer', correct: false },
            { text: 'Fourth answer', correct: false },
        ],
    },

    {
        question: 'Fourth question',
        answers: [
            { text: 'First answer', correct: true },
            { text: 'Second answer', correct: false },
            { text: 'Third answer', correct: false },
            { text: 'Fourth answer', correct: false },
        ],
    },

    {
        question: 'Fifth question',
        answers: [
            { text: 'First answer', correct: true },
            { text: 'Second answer', correct: false },
            { text: 'Third answer', correct: false },
            { text: 'Fourth answer', correct: false },
        ],
    },
];

//* Event listeners
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
