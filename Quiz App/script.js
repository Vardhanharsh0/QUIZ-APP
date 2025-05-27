const questions=[
    {
        question: "Which feature is not there in JAVA ?",
        answers:[
            { text: "Automatic Garbage Collection", correct: false},
            { text: "Classes & Objects", correct: false},
            { text: "Pointers", correct: true},
            { text: "Interfaces", correct: false}

        ]
    },
    {
        question: "What is 'M' stands for in MERN Stack ?",
        answers:[
            { text: "ExpressJS", correct: false},
            { text: "MongoDB", correct: true},
            { text: "MySQL", correct: false},
            { text: "MATLAB", correct: false}

        ]
    },
    {
        question: "Who created Python ?",
        answers:[
            { text: "Rasmus Lerdorf", correct: false},
            { text: "Guido van Rossum", correct: true},
            { text: "Larry Wall", correct: false},
            { text: "Dennis Ritchie", correct: false}

        ]
    },
    {
        question: "What is the purpose of CSS in web development ?",
        answers:[
            { text: "Cascading Style Sheets", correct: true},
            { text: "Computer Style Sheets", correct: false},
            { text: "Client-Side Scripting", correct: false},
            { text: "Code Styling System", correct: false}

        ]
    },
    {
        question: "Which data structure follows the Last In, First Out (LIFO) principle ?",
        answers:[
            { text: "Queue", correct: false},
            { text: "Linked List", correct: false},
            { text: "Tree", correct: false},
            { text: "Stack", correct: true}

        ]
    }    

];

const questionELement = document.getElementById("question");
const answerButtons = document.getElementById("ans-btn");
const nextButton = document.getElementById("nxt-btn");

let currentQuestnNumber = 0;
let score = 0;

function startQuiz(){
    currentQuestnNumber = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestn = questions[currentQuestnNumber];
    let QuestionNo = currentQuestnNumber + 1;
    questionELement.innerHTML = QuestionNo + ". " + currentQuestn.question;

    currentQuestn.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    const gif_animation1 = document.getElementById("gif-Win");
    gif_animation1.style.display = "none";
    const gif_animation2 = document.getElementById("gif-Lose");
    gif_animation2.style.display = "none"
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
        
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");   
    }
    Array.from(answerButtons.children).forEach(button=> {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore(){
   resetState();
   questionELement.innerHTML = `You scored ${score} out of ${questions.length} !`;
   nextButton.innerHTML = "Play Again";
   nextButton.style.display = "block";

   const gif_Winner= document.getElementById("gif-Win");
   if (score > 2) {
       gif_Winner.style.display = "block";
   } else {
       gif_Winner.style.display = "none";
   }

   const gif_Loser= document.getElementById("gif-Lose");
   if (score <= 2) {
       gif_Loser.style.display = "block";
   } else {
       gif_Loser.style.display = "none";
   }
}

function handleNextButton(){
    currentQuestnNumber++;
    if(currentQuestnNumber < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestnNumber <  questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();