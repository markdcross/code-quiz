//* Timer vars
let countdown;
let secondsLeft;
let score = 0;
const highscoreBtn = document.getElementById('highscore-btn');
const timerDisplay = document.getElementById('timeLeft');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerEl = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerBtnsEl = document.getElementById('answer-btns');
let shuffledQuestions;
let currentQuestionIndex;

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
        // Checks to see if the answer is correct
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
    // Check if answer is correct or incorrect and provides appropriate response
    if (this.dataset.correct) {
        console.log(this.dataset.correct);
        score += 10;
        // Display "Correct" if answer is correct
        document.getElementById('controls').innerHTML = '<h3>Correct!</h3>';

        setTimeout(function () {
            document.getElementById('controls').innerHTML = '';
        }, 1000);
    } else {
        // Display "Wrong!" if answer is incorrect
        document.getElementById('controls').innerHTML = '<h3>Wrong!</h3>';
        setTimeout(function () {
            document.getElementById('controls').innerHTML = '';
        }, 1000);
        //TODO Add an else below to remove time if answer is wrong
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        //TODO Adjust to transition to datacapture and high score
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
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
//TODO Adjust to transition to datacapture and high score
//TODO Add timer trigger to end game (if seconds <=0)
//TODO ***function gameOver () {}, or if else seconds =0 in timer function?

// //* DOM functions
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

//* Event listeners
startButton.addEventListener('click', startQuiz);
// nextButton.addEventListener('click', () => {
//     currentQuestionIndex++;
//     setNextQuestion();
// });
