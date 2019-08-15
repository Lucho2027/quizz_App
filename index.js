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
        $('.quiz-question').html(resultPrompt());
 }
}
function generateQuestion() {
    const questionString = generateQuestionString(STORE);
    $('.quiz-question').html(questionString);

}

// igual al renderShoppingList del ejemplo
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
    $('.quiz-question').on('click', '.submitButton', function (event) {

        event.preventDefault();
        let userAnswer = $('input:checked');
        let answer = userAnswer.val();
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        
        if (answer === correctAnswer) {
            updateScore();
            updateQuestionNumber();
            generateQuestion()
            alert(`${correctAnswer} is the right answer!`)
        }
        else if (answer === undefined) {
            alert('Please enter an answer!');
            generateQuestion()
        }

        else if (answer != correctAnswer) {
            alert(`Try Again, the right answer is  ${correctAnswer}`)
            updateQuestionNumber();
            generateQuestion();

            
        }
      
    });
    
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
    resultPrompt();
      
      
}
$(handleQuiz);