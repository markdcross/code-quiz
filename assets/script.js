//* Questions
// TODO Update questions and shuffle correct answers
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

//* Global vars
const highscoreBtn = document.getElementById('highscore-btn');
const clearBtn = document.getElementById('clear-btn');
const reloadBtn = document.getElementById('reload-btn');
const timerDisplay = document.getElementById('timeLeft');
const startButton = document.getElementById('start-btn');
const questionContainerEl = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerBtnsEl = document.getElementById('answer-btns');
const controlsEl = document.getElementById('controls');
const gameOverEl = document.getElementById('gameOverEl');
const scoreDisplay = document.getElementById('score');

//* Scoring/HighScore
const mostRecentScore = localStorage.getItem('mostRecentScore');
const initialsEl = document.getElementById('initials');
const highScoresEl = document.getElementById('highScoresEl');
const highScoresList = document.getElementById('highScoresList');
var storedHighScores = JSON.parse(localStorage.getItem('highScores'));
const maxHighScores = 5;
var highScores = [];

let score = 0;
let countdown;
let secondsLeft;
let shuffledQuestions;
let currentQuestionIndex;

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

    // Shuffles the order of the questions
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    //shows the question container element

    questionContainerEl.classList.remove('hide');
    setNextQuestion();
}

// Clears correct/wrong answer color effect and shows the next question
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

function resetState() {
    while (answerBtnsEl.firstChild) {
        answerBtnsEl.removeChild(answerBtnsEl.firstChild);
    }
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;

    // Check if answer is correct or incorrect and provides appropriate response
    if (correct) {
        score += 10;
        // Display "Correct" for 1 sec if answer is correct
        document.getElementById('controls').innerHTML = '<h3>Correct!</h3>';

        setTimeout(function () {
            document.getElementById('controls').innerHTML = '';
        }, 1000);
    } else {
        // Display "Wrong!" for 1 sec if answer is incorrect
        document.getElementById('controls').innerHTML = '<h3>Wrong!</h3>';

        setTimeout(function () {
            document.getElementById('controls').innerHTML = '';
        }, 1000);
        //TODO Remove time if answer is wrong
    }

    // Check to see if there are more questions.
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        // If there are more questions, set the next question
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        // If there are no more questions, end the quiz
        //TODO Adjust to transition to datacapture and high score
        gameOver();
        scoreDisplay.innerText = score;
    }
}

//* Timer
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

//* Functions to end the game
function gameOver() {
    questionContainerEl.classList.add('hide');
    controlsEl.classList.add('hide');
    gameOverEl.classList.remove('hide');
    clearInterval(countdown);
}

//* Local storage
function showHighScores() {
    gameOverEl.classList.add('hide');
    startButton.classList.add('hide');
    questionContainerEl.classList.add('hide');
    controlsEl.classList.add('hide');
    highScoresEl.classList.remove('hide');
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
    console.log(highScores);

    // Storing scores in local storage and rendering in DOM
    storeHighScore();
    renderHighScore();

    gameOverEl.classList.add('hide');
    highScoresEl.classList.remove('hide');
});

//TODO Add timer trigger to end game (if seconds <=0)
//TODO *** Function gameOver () {}, or if else seconds =0 in timer function?

//TODO Adjust to transition to datacapture and high score
//TODO *** End game on seconds <= 0

//* DOM functions
// //Removes an element from the document
// function removeElement(elementId) {
//     elementId.remove();
// }
// // Adds an element to the document
// function addElement(parentId, elementTag, elementId, html) {
//     var p = document.getElementById(parentId);
//     var newElement = document.createElement(elementTag);
//     newElement.setAttribute('id', elementId);
//     newElement.innerHTML = html;
//     p.appendChild(newElement);
// }
