// remove the start button when clicked
$('#start').on('click', function(){
    $('#start').remove();
  game.loadQuestion();

})

// click event when you click the answer

$(document).on('click','.answer-button',function(e){
    game.clicked(e);
})

$(document).on('click','#reset',function(){
    game.reset();
})

// Variable for questions, an array of objects 

var questions = [{
    question: "What is the state tree of North Carolina?",
    answers: ["Dogwood", "Longleaf Pine", "Bald Cypress","Fraser Fir"],
    correctAnswer: "Dogwood",
    image: "assets/images/imagename"
}, {
    question: "North Carolina grows the most what in the nation?",
    answers: ["Tomatoes", "Sweet Potatoes", "Broccoli", "Soybeans"],
    correctAnswer: "Sweet Potatoes",
    image: "assets/images/imagename",
}, {
question: "What is the state bird?",
    answers: ["Bald Eagle", "Blue Jay", "Cardinal", "Wild Turkey"],
    correctAnswer: "Cardinal",
    image: "assets/images/imagename",
},

];


var game = {
    questions:questions,
    currentQuestion:0, 
    counter:30, 
    correct:0,
    incorrect:0,
    unanswered:0,
    
    countdown: function(){
        game.counter --;
        $('#counter').html(game.counter); 
        if(game.counter<=0){
            console.log("TIME UP!")
            game.timeUp();
        }
    },
    loadQuestion: function (){
        timer = setInterval(game.countdown,1000);
        $('#subwrapper').html("<h2> Time to Guess: <span id ='counter'>30</span> Seconds</h2>");
        $('#subwrapper').append('<h2>'+questions[game.currentQuestion].question+'</h2>');
        for(var i=0;i<questions[game.currentQuestion].answers.length;i++){
            $('#subwrapper').append('<button class="answer-button id="button- '+i+'" data-name="'+questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
        }
    },
    nextQuestion: function(){
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();

    },
    timeUp: function(){
        clearInterval(timer);
        game.unanswered++;
        $('#subwrapper').html('<h2>Out of time!<h2>');
        $('#subwrapper').append('<h3>The correct answer was: '+questions[game.currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        } else{
            setTimeout(game.nextQuestion,3*1000);
        }

    },
    results: function(){
        clearInterval(timer);
        $('#subwrapper').html('<h2>Complete!</h2>')
        $('#subwrapper').append(" Correct: " +game.correct + '<br/>');
        $('#subwrapper').append(" Incorrect: " +game.incorrect + '<br/>');
        $('#subwrapper').append(" Unanswered: " +game.unanswered + '<br/>');
        $('#subwrapper').append("<button id= reset>Try again?</button>")


    },
    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();
    } else {
        game.answeredIncorrectly();
    }

    },
    answeredCorrectly: function(){
        console.log("right!")
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2> CORRECT!</h2>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,2*1000);
        } else{
            setTimeout(game.nextQuestion,2*1000);
        }

    },
    answeredIncorrectly: function(){
        console.log("wrong")
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2> Wrong!</h2>');
        $('#subwrapper').append('<h3>The correct answer was: '+questions[game.currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,2*1000);
        } else{
            setTimeout(game.nextQuestion,2*1000);
        }

    },
    reset: function(){
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();

    }

}