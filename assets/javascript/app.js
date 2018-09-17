$(document).ready(function(){

    var timeLeft = 15;
    var intervalId;
    var userSelection;
    var answered;
    var correctAnswer = 0; //total times user guessed right
    var incorrectAnswer= 0; // total times user guessed wrong
    // var noAnswer = 0; //total times user did not guess answer
    var currentQuestionIndex = 0; //counts how many questions have been asked

    //Question set
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
            question: "Who gives Harry the Mauraders Map?", 
            choices: ["Dumbledore", "Hagrid", "Lupin", "Fred and George"],
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
            question: "How many tasks are in the Triwizard Tournament?", 
            choices: ["3", "8", "5", "10"],
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

    //Gifs that correspond with each question
    var gifArray = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"];

    var message = {
        correct: "Nice! You got it right!",
        incorrect: "Sorry!",
        outOfTime: "Times up!",
        done: "Alright, let's see how you did!"
    }

    $("#startBtn").on("click", function(){
        $(this).hide();
        $("#intro").hide();
        newGame();
    });

    function newGame() {
        $("#finalMessage").empty();
        $("#correctAnswers").empty();
        $("#wrongAnswers").empty();
        // $("#noAnswer").empty();
        $("#startOverBtn").hide();
        currentQuestionIndex = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        noAnswer = 0;
        timeLeft = 15;
        newQuestion();  
    }

    function newQuestion() {

        timeLeft = 30;
        $("#message").empty();
        $("#answerReveal").empty();
        $("#gif").empty();
        // answered = true;
        runTimer();

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
            clearInterval(intervalId);
            answerPage();
            
            // console.log(userSelection);
        });

        
    }

    function runTimer() {

        $("#timer").html("<h2> Time remaining: " + timeLeft + "</h2>");
        clearInterval(intervalId)
        intervalId = setInterval(showCountdown, 1000);
        // answered = true;
    }

    function showCountdown() {
        timeLeft--;
        $("#timer").html("<h2> Time remaining: " + timeLeft + "</h32");

        if (timeLeft < 1) {
            answered = false;
            clearInterval(intervalId);
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
        $("#gif").html('<img src = "assets/images/'+ gifArray[currentQuestionIndex] +'.gif" width = "600px">');

        //checks to see if answer was correct/incorrect or if unanswered
        if ((userSelection === rightAnswerIndex) && (answered = true)) {
            correctAnswer++;
            $("#message").html(message.correct);
        } 
        else if ((userSelection !== rightAnswerIndex) && (answered = true)) {
            incorrectAnswer++;
            $("#message").html(message.incorrect);
            $("#answerReveal").html("The correct answer was " + rightAnswerText);
        } 
        // else { 
        //     noAnswer++;
        //     $("#message").html(message.outOfTime);
        //     $("#answerReveal").html("The correct answer was " + rightAnswerText);
        //     // answered = true;
        // }
        
        if (currentQuestionIndex == (questionArray.length-1)){
            setTimeout(endOfGame, 3000)
        } 
        else {
            currentQuestionIndex++;
            setTimeout(newQuestion, 3000);
        }	
    }

    $("#startOverBtn").on("click", function(){
        $(this).hide();
        newGame();
    });

    function endOfGame(){
        $("#timeLeft").empty();
        $("#message").empty();
        $("#answerReveal").empty();
        $("#gif").empty();
        $("#finalMessage").html(message.done);
        $("#correctAnswers").html("Correct Answers: " + correctAnswer);
        $("#wrongAnswers").html("Incorrect Answers: " + incorrectAnswer);
        // $("#noAnswer").html("Unanswered: " + noAnswer);
        $("#startOverBtn").addClass("reset");
        $("#startOverBtn").show();
        $("#startOverBtn").html("Start Over?");
    }

});