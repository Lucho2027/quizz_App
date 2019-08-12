let questionNumber = 0;
let score = 0;

function start() {
    $('.start-game').show();
    $('.quiz-question').hide();
}
$(start)
function listener() {
    $('body').on('submit', '.start-game',event=>{
        $('.quiz-question').show();
     });
    

}