'use strict';
let questionNumber = 0;
let score = 0;
// this function will be responsible for rendering the entry or welcome screen in the DOM
function renderEntryScreen() {
    $('.start-game').show();
    $('.quiz-question').hide();

}
function updateQuestionNumber() {
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
}

function updateScore() {
    score++;
    $('.score').text(score);
}
//this function will be responsible for when users click on start quiz
//esta funcion equivale al generateShppingItemsString
function generateQuestionString() {

    if (questionNumber < STORE.length) {
        return `<div class="quiz-question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form id="form">
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submit-button">Submit</button>
    </fieldset>
    </form>
    </div>`;
    } else {
        $('.questionNumber').text(10)
        $('.quiz-question').html(resultPrompt());
        handleStartOver();


    }
}
function generateQuestion() {
    const questionString = generateQuestionString(STORE);
    $('.quiz-question').html(questionString);

}

function handleStart() {
    $('.start-button').click(function (event) {
        $('.start-game').hide();
        $('.quiz-question').show();
        $('.questionNumber').text(1);
    })
    generateQuestion();

}


// this function will be responsible for letting the user know whether they got the answer right or wrong
// this function will be responsible to let the user know they got the right answer
function handleAnswerClicked() {
    $('.quiz-question').on('submit', '#form', function (event) {

        event.preventDefault();
        let userAnswer = $('input:checked');
        let answer = userAnswer.val();
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;

        if (answer === correctAnswer) {
            updateScore();
            updateQuestionNumber();
            rightAnswer();
            

        }
       
        else if (answer != correctAnswer) {
            
            updateQuestionNumber();
            wrongAnswer();
            


        }

    });
}

function rightAnswer() {
    let html =`<div class="right-answer">
    <p>You were Right! You have answered ${score} questions correctly out of ${questionNumber}. Keep it up! </p>
    <button type="button" class="continue-button">Next Question</button></div>`

    $('.container').append(html);
    $('.quiz-question').hide();


}

function handleRightAnswer() {
    
    $('body').on('click','.continue-button',function (event) {
        event.preventDefault();
        $('.right-answer').hide();
        $('.start-game').hide();
        $('.quiz-question').show();
        generateQuestion();
        console.log(questionNumber);

    })

}
function wrongAnswer() {
    let html =`<div class="wrong-answer">
    <p>You were Wrong! You have answered ${score} questions correctly out of ${questionNumber}. Keep it up! </p>
    <button type="button" class="continue-button">Next Question</button></div>`

    $('.container').append(html);
    $('.quiz-question').hide();


}

function handleWrongAnswer() {
    
    $('body').on('click','.continue-button',function (event) {
        event.preventDefault();
        $('.wrong-answer').hide();
        $('.start-game').hide();
        $('.quiz-question').show();
        generateQuestion();
        

    })

}


function resultPrompt() {
    let result = (score / questionNumber) * 100;
    if (questionNumber >= 10) {
        return `
        <div class="final-result">
        <p>You were <span class="grade">${result} %</span> accurate!</p><br>
        <p> You have answered <span class="grade">${score}</span> correctly, out of 10 questions<p>
        <button type="submit" class="restart-button">Start Over!</button></div>`;
    }


}

function handleStartOver() {
    $('.restart-button').click(function (event) {
        score = 0;
        $('.score').text(score);
        questionNumber = 0;
        $('.questionNumber').text(questionNumber);
        $('.start-game').show();
        $('.quiz-question').hide();
        generateQuestion();


    })

}



//this function will be responsible to let the user know they got the wrong answer


// this function will be the callback when the page loads. it's responsible for
// initially rendering the quiz, and activating the individual functions
// that handle the questions and when the user answer them.
function handleQuiz() {
    generateQuestion()
    renderEntryScreen();
    generateQuestionString();
    handleStart();
    handleAnswerClicked();
    handleRightAnswer();
    handleWrongAnswer()




}
$(handleQuiz);