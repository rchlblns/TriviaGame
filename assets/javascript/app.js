//Global variables
var totalCorrect = 0;
var totalWrong = 0;

var questions = [
    {
        question: "What is Neville Longbottom's bogart?", 
        answerChoices: ["A spider", "Professor Snape", "His grandma", "A dementor"],
        correctAnswer: "Professor Snape",
    },
    {
        question: "Where does Harry Potter live?", 
        answerChoices: ["Privet Drive", "Ottery Street", "Grimmauld Place", "Little Hangleton"],
        correctAnswer: "Privet Drive",
    },
    {
        question: "In addition to teaching potions, Professor Snape also taught what other subject?", 
        answerChoices: ["Transfiguration", "Charms", "Defense Against the Dark Arts", "Divination"],
        correctAnswer: "Defense Against the Dark Arts",
    },
    {
        question: "Who drives the Knight Bus?", 
        answerChoices: ["Stan Shunpike", "Marcus Belby", "Ernie Prang", "Reginald Cattermore"],
        correctAnswer: "Stan Shunpike",
    },
    {
        question: "Which two countries competed in the Quidditch World Cup?", 
        answerChoices: ["England and France", "Egypt and Moldova", "Senegal and China", "Ireland and Bulgaria"],
        correctAnswer: "Ireland and Bulgaria",
    },
    {
        question: "How many Weasley siblings are there?", 
        answerChoices: ["5", "6", "7", "8"],
        correctAnswer: "7",
    },
    {
        question: "What article of clothing makes Dobby a free elf?", 
        answerChoices: ["A shoe", "A sock", "A hat", "A shirt"],
        correctAnswer: "A sock",
    },
    {
        question: "What is Dumbledore's favorite candy?", 
        answerChoices: ["Lemon Drops", "Exploding Bonbons", "Chocolate Cauldrons", "Fizzing Wizzbees"],
        correctAnswer: "Lemon Drops",
    },
    {
        question: "Whhich platfrom is the Hogwarts Express located at?", 
        answerChoices: ["Four and three-eights", "Twelve and one-half", "Five and one-thirds", "Nine and three-quarters"],
        correctAnswer: "Nine and three-quarters",
    },
    {
        question: "Which spell is used to make objects fly?", 
        answerChoices: ["Obliviate", "Alohamora", "Wingardium Leviosa", "Lumos"],
        correctAnswer: "Wingardium Leviosa",   
    }
]

//Sets number counter to 60
var number = 60;
//Variable that holds interval ID when we execute the "run" function
var intervalId;

//function to run the decrement function once a second
function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

//Function to decrement the number
function decrement() {
    number--;
    $("#timer").html("<h2>" + number + "</h2>");
    if (number === 0) {
        stop();
        console.log("Times up!");
    }
}

console.log(number);

//Stop function
function stop() {
    clearInterval(intervalId);
}

run();