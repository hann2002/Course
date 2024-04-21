// Define variables
let questions = [];
let currentQuestionIndex = 0;
let numCorrectAnswers = 0;

// Fetch questions from CSV file
fetch("question.csv")
.then(response => response.text())
.then(data => {
    // Parse CSV data into array of question objects
    questions = parseCSV(data);
    // Display first question
    displayQuestion();
});
// Display a question and handle user's answer
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    // const optionsList = document.getElementById("options");
    const options = document.querySelectorAll(".option");
    console.log(currentQuestionIndex,"$$\n");
    // options.forEach(option => {
    // 	option.innerHTML = "";
    // });

    // Reset styles and feedback
    // options.forEach(option => {
    //     // option.style.color = "";
    //     option.innerHTML = "";
    //     // option.style.pointerEvents="";
    // });
    
    // document.getElementById("feedback").innerHTML = "";
    // option.removeEventListener("click", displayQuestion);
    // Set event listeners to options
    options.forEach((option, index) => {
        // option.style.color = "black";
        // option.innerHTML = ""
        option.disabled = false;
        console.log(option.children[0].children[1].children[0].children[0])
        var p = option.children[0].children[1].children[0].children[0]
        p.textContent = currentQuestion.options[index];
        // option.textContent = currentQuestion.options[index];
        // console.log(option.textContent);
        option.onclick = function handler(){
            
            // option.innerHTML="";
            // option.innerHTML+=currentQuestion.options[index];
            // Check user's answer
            const isCorrect = index === currentQuestion.answer;
            console.log(index, currentQuestion.answer, currentQuestion.options[index]);
            if (isCorrect) {
                p.style.color = "green";
                // option.innerHTML += " <i class='fas fa-check'></i>";
                numCorrectAnswers++;
                // document.getElementById("feedback").textContent = "Correct!";
                
            } 
            else {
                p.style.color = "red";
                // option.innerHTML += " <i class='fas fa-times'></i>";
                // document.getElementById("feedback").textContent = "Sorry, that's incorrect.";
                
            }
            // Disable options and submit button
            options.forEach(option => {
            	option.disabled = true;
            });
            
            // document.getElementById("submit-button").disabled = true;
            // Display next question or end game
            
            setTimeout(() => {
                p.style.color = "black";
                currentQuestionIndex++;
                // console.log(questions.length);
                if (currentQuestionIndex >= questions.length) {
                    console.log(currentQuestionIndex,"==\n");
                    endGame();
                }
                if (currentQuestionIndex < questions.length) {
                    displayQuestion();
                } 
                
            }, 1500);
        };
    
    // document.getElementById("feedback").textContent = "";
    // document.getElementById("submit-button").disabled = false;
});
}

// End game and display results
function endGame() {
    const options = document.querySelectorAll(".option");
    options.forEach((option, index) => {
        option.style.display = "none";
    })
   
    // Calculate star rating and message
    let starRating, message;
    if (numCorrectAnswers === 5) {
        starRating = "★★★";
        message = "Congratulations, you answered all of them correctly!";
    } else if (numCorrectAnswers >= 3) {
        starRating = "★★";
        message = "Just a little bit!";
    } else {
        starRating = "★";
        message = "Come on!";
    }
    // Display results
    const resultsContainer = document.getElementById("question");
    console.log(resultsContainer)
   
    resultsContainer.innerHTML = `
    <div class="service-item wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.6s">
      
      <h2>Results</h2>
      <p>You got ${numCorrectAnswers} out of ${questions.length} questions correct.</p>
      <p>Your star rating: ${starRating}</p>
      <p>${message}</p>
     
    </div>
    `;
    
}

// Parse CSV data into array of question objects
function parseCSV(data) {
    const lines = data.trim().split("\n");
    const headers = lines[0].replace('\r', '').split(",");
    const questions = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",");
        const question = {};
        for (let j = 0; j < headers.length; j++) {
            question[headers[j]] = values[j].replace(/['"]+/g, '');
        }
        questions.push(question);
        console.log(question);
    }
    return questions.map(q => ({
        question: q.question,
        options: [q.option1, q.option2, q.option3, q.option4],
        answer: q.answer - 1
    }));
}

