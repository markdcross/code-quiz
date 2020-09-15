# code-quiz

This short code quiz was created with HTML, CSS, and vanilla JS. The idea is simple - answer the questions before your time runs out. Every correct answer awards you 10 points, while every incorrect answer reduces your timer by 10 seconds. At the end of the quiz, you have the opportunity to save your score to a high scores list (via local storage). The questions cover JavaScript topics such as variables and arrays. The styling is simple but clean, and I recommend taking the quiz with your sound on.

# Techniques/skills

This entire quiz lives in one HTML doc. I use DOM manipulation via events and event listeners to create, show, and hide divs and content based on the next step in the quiz logic. The questions and answers live within an array that is randomized each time the quiz is taken. If a question is answered correctly, a "correct" message appears, colors change, and a sound is played. The same occurs for an incorrect answer, though each effect is different.

# Usage

Play around with it! I'll add more questions soon, but this showcases the core functionality - questions dynamically populating and answers being selected.

# Screenshots

![intro](assets/img/intro.png)
![question](assets/img/question.png)
![correct](assets/img/correct.png)
![gameover](assets/img/gameover.png)
![highscore](assets/img/highscores.png)
