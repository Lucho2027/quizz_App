'use strict';
let questionNumber = 0;
let score = 0;
// this function will be responsible for rendering the entry or welcome screen in the DOM
function renderEntryScreen() {
    $('.start-game').show();
    $('.quiz-question').hide();
    console.log('`renderEntryScreen` ran');
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
    console.log("Generating the question", questionNumber);
    if (questionNumber < STORE.length) {
        return `<div class="quiz-question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
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
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
    } else {
        $('.questionNumber').text(10)
    }
}

// igual al renderShoppingList del ejemplo
function handleStart() {
    $('.start-button').click(function (event) {
        $('.start-game').hide();
        $('.quiz-question').show();
        $('.questionNumber').text(1);
    })
    const questionString = generateQuestionString(STORE);
    $('.quiz-question').html(questionString);



    console.log('`handleStart` ran');
}

// this function will be responsible for letting the user know whether they got the answer right or wrong
// this function will be responsible to let the user know they got the right answer
function handleAnswerClicked() {
    $('.quiz-question').on('click', '.submitButton', function (event) {
        console.log("made it to answer clicked")
        event.preventDefault();
        let userAnswer = $('input:checked');
        let answer = userAnswer.val();
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        console.log(answer, correctAnswer)
        if (answer === correctAnswer) {
            userAnswer.parent().addClass('correct');
            updateScore();
            updateQuestionNumber();
            const questionString = generateQuestionString(STORE);
            $('.quiz-question').html(questionString);
        }
        else if (answer === undefined) {
            alert('Please enter an answer!');
            const questionString = generateQuestionString(STORE);
            $('.quiz-question').html(questionString);
        }
        else {
            updateQuestionNumber();
            const questionString = generateQuestionString(STORE);
            $('.quiz-question').html(questionString);
        }
        console.log(score);
    });
    console.log('`handleAnswerClicked` ran');

}

//this function will be responsible to let the user know they got the wrong answer


// this function will be the callback when the page loads. it's responsible for
// initially rendering the quiz, and activating the individual functions
// that handle the questions and when the user answer them.
function handleQuiz() {

    renderEntryScreen();
    generateQuestionString();
    handleStart();
    handleAnswerClicked();
    }
$(handleQuiz);