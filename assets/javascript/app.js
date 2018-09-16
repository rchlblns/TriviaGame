$(document).ready(function(){

    var timeLeft = 15;
    var intervalId;
    var userSelection;
    var answered;
    var correctAnswer = 0; //total times user guessed right
    var incorrectAnswer= 0; // total times user guessed wrong
    var noAnswer = 0; //total times user did not guess answer
    var currentQuestionIndex = 0; //counts how many questions have been asked

    var questionArray = [
        {
            question: "What is Neville Longbottom's bogart?", 
            choices: ["A spider", "Professor Snape", "His grandma", "A dementor"],
            correct: 1,
        },
        {
            question: "Where does Harry Potter live?", 
            choices: ["Privet Drive", "Ottery Street", "Grimmauld Place", "Little Hangleton"],
            correct: 0,
        },
        {
            question: "In addition to potions, Professor Snape also taught what other subject?", 
            choices: ["Transfiguration", "Charms", "Defense Against the Dark Arts", "Divination"],
            correct: 2,
        },
        {
            question: "Who is the conductor of the Knight Bus?", 
            choices: ["Stan Shunpike", "Marcus Belby", "Ernie Prang", "Reginald Cattermore"],
            correct: 0,
        },
        {
            question: "Which two countries competed in the Quidditch World Cup?", 
            choices: ["England and France", "Egypt and Moldova", "Senegal and China", "Ireland and Bulgaria"],
            correct: 3,
        },
        {
            question: "How many Weasley siblings are there?", 
            choices: ["5", "6", "7", "8"],
            correct: 2,
        },
        {
            question: "What article of clothing makes Dobby a free elf?", 
            choices: ["A shoe", "A sock", "A hat", "A shirt"],
            correct: 1,
        },
        {
            question: "What is Dumbledore's favorite candy?", 
            choices: ["Lemon Drops", "Exploding Bonbons", "Chocolate Cauldrons", "Fizzing Wizzbees"],
            correct: 0,
        },
        {
            question: "Which platfrom is the Hogwarts Express located at?", 
            choices: ["Four and three-eights", "Twelve and one-half", "Five and one-thirds", "Nine and three-quarters"],
            correct: 3,
        },
        {
            question: "Which spell is used to make objects fly?", 
            choices: ["Obliviate", "Alohamora", "Wingardium Leviosa", "Lumos"],
            correct: 2,   
        }
    ];

    var gifArray = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"];

    var messages = {
        correct: "Nice! You got it right!",
        incorrect: "Sorry!",
        outOfTime: "Times up!",
        done: "Alright! Let's see how you did."
    }

    $("#startBtn").on("click", function(){
        $(this).hide();
        newGame();
    });

    function newGame() {
        $("#finalMessage").empty();
        $("#correctAnswers").empty();
        $("#wrongAnswers").empty();
        $("#noAnswer").empty();
        currentQuestionIndex = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        noAnswer = 0;
        newQuestion();
        // countdown();
    }

    function newQuestion() {

        timeLeft = 15;
        $("#message").empty();
        $("#answerReveal").empty();
        $("#gif").empty();
        answered = true;
        countdown();

        $("#currentQuestion").html("<h2>" + questionArray[currentQuestionIndex].question + "</h2>");

        for (var i =0; i < 4; i++) {
            var choiceList = $("<div>");
            choiceList.text(questionArray[currentQuestionIndex].choices[i]);
            choiceList.attr("data-index", i);
            choiceList.addClass("thisChoice");
            $("#answerChoices").append(choiceList);
        }

        //on click event to track the user's answer selection
        $(".thisChoice").on("click", function(){
            userSelection = $(this).data('index');
            //changes user selection from string to integer
            userSelection = parseInt(userSelection);
            clearInterval(time);
            answerPage();
            console.log(userSelection);
        });

        
    }

    function runTimer() {
        // var timeLeft = 15;
        // $("#timer").html("<h3> Time remaining: " + timeLeft + "</h3>");
        clearInterval(intervalId)
        intervalId = setInterval(showCountdown, 1000);
        answered = true;
    }

    function showCountdown() {
        timeLeft--;
        $("#timer").html("<h3> Time remaining: " + timeLeft + "</h3>");
        if (timeLeft === 0) {
            clearInterval(intervalId);
            answered = false;
            answerPage();
        }
    }

    function answerPage() {
        $("#timer").empty();
        $("#currentQuestion").empty();
        $(".thisChoice").empty();

        //this variable is equal to the answer of the current question
        var rightAnswerText = questionArray[currentQuestionIndex].choices[questionArray[currentQuestionIndex].correct];
        //this variable is equal to the index of the answer to the current question
        var rightAnswerIndex = questionArray[currentQuestionIndex].correct;
        $('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestionIndex] +'.gif" width = "400px">');

        //checks to see if answer was correct/incorrect or if unanswered
        if ((userSelection === rightAnswerIndex) && (answered = true)){
            correctAnswer++;
            $('#message').html(messages.correct);
        } 
        else if ((userSelection != rightAnswerIndex) && (answered = true)){
            incorrectAnswer++;
            $('#message').html(messages.incorrect);
            $('#answerReveal').html('The correct answer was ' + rightAnswerText);
        } 
        else { 
            noAnswer++;
            $('#message').html(messages.outOfTime);
            $('#answerReveal').html('The correct answer was ' + rightAnswerText);
            answered = true;
        }
        
        if (currentQuestionIndex == (questionArray.length-1)){
            setTimeout(endOfGame, 4000)
        } 
        else {
            currentQuestionIndex++;
            setTimeout(newQuestion, 4000);
        }	
    }

    $("#startOverBtn").on("click", function(){
        $(this).hide();
        newGame();game 
    });

    function endOfGame(){
        $('#timeLeft').empty();
        $('#message').empty();
        $('#correctedAnswer').empty();
        $('#gif').empty();
    
        $('#finalMessage').html(messages.done);
        $('#correctAnswers').html("Correct Answers: " + correctAnswer);
        $('#wrongAnswers').html("Incorrect Answers: " + incorrectAnswer);
        $('#noAnswer').html("Unanswered: " + noAnswer);
        $('#startOverBtn').addClass('reset');
        $('#startOverBtn').show();
        $('#startOverBtn').html('Start Over?');
    }

});