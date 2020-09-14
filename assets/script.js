//* Questions
// TODO Update questions and shuffle correct answers
const questions = [
    {
        question: 'What is the purpose of an array?',
        answers: [
            { text: 'To store data in an organized fashion', correct: true },
            { text: 'To organize data into key-value pairs', correct: false },
            {
                text: 'To organize data into lettered positions',
                correct: false,
            },
            { text: 'To make developers cry', correct: false },
        ],
    },

    {
        question:
            'Which of the methods below does NOT change the array it is called on?',
        answers: [
            { text: '.push()', correct: false },
            { text: '.shift()', correct: false },
            { text: '.slice()', correct: true },
            { text: '.pop()', correct: false },
        ],
    },

    {
        question: 'Which statement is true about for loops?',
        answers: [
            {
                text: 'for loops always run an unknown number of times',
                correct: false,
            },
            { text: 'for loops always count from 0 upwards', correct: false },
            {
                text:
                    'for loops are appropriate when looping a predetermined number of times',
                correct: true,
            },
            {
                text: 'for loops can never result in an infinite loop',
                correct: false,
            },
        ],
    },

    {
        question: 'What is the purpose of a parameter?',
        answers: [
            {
                text: 'To specify actual values passed into a funciton',
                correct: false,
            },
            { text: 'What is a parameter?', correct: false },
            { text: 'To call a function', correct: false },
            { text: 'To alow a function to accept data', correct: true },
        ],
    },

    {
        question:
            'Which of the following best describes what a function in JavaScript is used for?',
        answers: [
            { text: 'A function creates new variables', correct: false },
            {
                text:
                    'A function is a reusable piece of code that can accept input and performs a specific task',
                correct: true,
            },
            { text: 'A function stores data', correct: false },
            {
                text: 'A function allows for the use of mathematical operators',
                correct: false,
            },
        ],
    },
];

//* Global vars
// Taking the quiz
const highscoreBtn = document.getElementById('highscore-btn');
const clearBtn = document.getElementById('clear-btn');
const reloadBtn = document.getElementById('reload-btn');
const timerDisplay = document.getElementById('timeLeft');
const startButton = document.getElementById('start-btn');
const questionContainerEl = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerBtnsEl = document.getElementById('answer-btns');
const controlsEl = document.getElementById('controls');
const introEl = document.getElementById('intro');
const gameOverEl = document.getElementById('gameOverEl');
const scoreDisplay = document.getElementById('score');
let shuffledQuestions;
let currentQuestionIndex;

// Scoring/HighScore
const mostRecentScore = localStorage.getItem('mostRecentScore');
const initialsEl = document.getElementById('initials');
const highScoresEl = document.getElementById('highScoresEl');
const highScoresList = document.getElementById('highScoresList');
var storedHighScores = JSON.parse(localStorage.getItem('highScores'));
const maxHighScores = 5;
var highScores = [];
let score = 0;

// Timer
const now = Date.now();
let seconds = 60;
let then = now + seconds * 1000;
let countdown;
let secondsLeft;

//* Event listeners
startButton.addEventListener('click', startQuiz);
highscoreBtn.addEventListener('click', showHighScores);
clearBtn.addEventListener('click', clearHighScores);
reloadBtn.addEventListener('click', function () {
    location.reload();
});

//* Functions to play the game
// Starting the quiz and timer
function startQuiz() {
    startTimer();
    startButton.classList.add('hide');
    introEl.classList.add('hide');

    // Shuffles the order of the questions
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    //shows the question container element
    questionContainerEl.classList.remove('hide');

    // Displays first question
    setNextQuestion();
}

// Clears the answer boxes and shows the next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Shows the questions and answers in the correct elements and checks for correct answer
function showQuestion(question) {
    // Shows the question value based on the question key within the currently indexed question
    questionEl.innerText = question.question;

    // Create buttons for each answer
    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');

        // Checks to see which answer is correct
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerBtnsEl.appendChild(button);
    });
}

// Clears the answer boxes
function resetState() {
    while (answerBtnsEl.firstChild) {
        answerBtnsEl.removeChild(answerBtnsEl.firstChild);
    }
}

function correctAnswer() {
    // Add 10 to score
    score += 10;
    // Display "Correct!" and change background color of element for 1 sec
    controlsEl.innerHTML = '<h3>Correct!</h3>';
    controlsEl.style.backgroundColor = 'green';

    setTimeout(function () {
        controlsEl.innerHTML = '';
        controlsEl.style.backgroundColor = '';
    }, 1000);
    cheerSound();
}

function wrongAnswer() {
    // Reduce timer by 10 seconds
    then -= 10000;
    displayTimeLeft(secondsLeft);
    // Display "Wrong!"  and change background color of element for 1 sec
    controlsEl.innerHTML = '<h3>Wrong!</h3>';
    controlsEl.style.backgroundColor = 'red';
    setTimeout(function () {
        controlsEl.innerHTML = '';
        controlsEl.style.backgroundColor = '';
    }, 1000);
    booSound();
}

function cheerSound() {
    var cheer = document.getElementById('cheer');
    cheer.play();
}

function booSound() {
    var boo = document.getElementById('boo');
    boo.play();
}

// Selecting your answer
function selectAnswer(event) {
    // Identifies which answer is selected
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;

    // Check if answer is correct or incorrect and provides appropriate response
    if (correct) {
        // Display "Correct" for 1 sec if answer is correct
        correctAnswer();
    } else {
        wrongAnswer();
    }

    // Check to see if there are more questions.
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        // If there are more questions, set the next question
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        // If there are no more questions, end the quiz
        gameOver();
    }
}

//* Timer
function timer(seconds) {
    // Clear any existing timers
    clearInterval(countdown);

    // First display of time (before interval begins)
    displayTimeLeft(seconds);

    // Find and display the time left every second
    countdown = setInterval(() => {
        secondsLeft = Math.round((then - Date.now()) / 1000);
        // Check if we should stop it
        if (secondsLeft < 0) {
            clearInterval(countdown);
            gameOver();
            displayTimeLeft('');
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
    timer(seconds);
}

//* Functions to end the game
function gameOver() {
    questionContainerEl.classList.add('hide');
    controlsEl.classList.add('hide');
    gameOverEl.classList.remove('hide');
    scoreDisplay.innerText = score;
    clearInterval(countdown);
}

//* Local storage
function showHighScores() {
    gameOverEl.classList.add('hide');
    startButton.classList.add('hide');
    questionContainerEl.classList.add('hide');
    controlsEl.classList.add('hide');
    highScoresEl.classList.remove('hide');
    introEl.classList.add('hide');

    clearInterval(countdown);
    init();
    renderHighScore();
}

function init() {
    // Get stored highscores from localStorage
    // Parsing the JSON string to an object
    var storedHighScores = JSON.parse(localStorage.getItem('highScores'));

    // If todos were retrieved from localStorage, update the todos array to it
    if (storedHighScores !== null) {
        highScores = storedHighScores;
    }
}

function storeHighScore() {
    // Stringify and set "highscore" key in localStorage to todos array
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function renderHighScore() {
    // Render a new li for each High Score
    highScoresList.innerHTML = highScores
        .map((highScores) => {
            return `<li>${highScores.initials}: ${highScores.score}</li>`;
        })
        .join('');
}

function clearHighScores() {
    localStorage.clear();
    highScoresList.innerHTML = '';
}

initialsForm.addEventListener('submit', function (event) {
    event.preventDefault();
    init();

    // Adding high score to array
    const highscore = {
        initials: initialsEl.value.trim(),
        score: score.toString(),
    };
    highScores.push(highscore);
    initialsEl.value = '';

    //ordering high scores and capping at 5
    highScores.sort((a, b) => b.score - a.score);

    highScores.splice(5);

    // Storing scores in local storage and rendering in DOM
    storeHighScore();
    renderHighScore();

    gameOverEl.classList.add('hide');
    highScoresEl.classList.remove('hide');
});
