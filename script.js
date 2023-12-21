const gameStatus = document.getElementById("gamestatusid");
const gameContainer = document.getElementById("gamecontainerid");
const userCircleId = document.getElementById("user_circleId");
const computerCircleId = document.getElementById("computer_circleId");


document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("lines");
    const ctx = canvas.getContext("2d");
    canvas.width = 600; // Set the same width as the canvas in CSS
    canvas.height = 420; // Set the same height as the canvas in CSS
  
    const choices = document.querySelectorAll(".choice");
  
    const userScoreDisplay = document.getElementById("yourvalue");
    const computerScoreDisplay = document.getElementById("csvalue");
 
    let userScore = parseInt(localStorage.getItem("userScore")) || 0;
    let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

 


    // const userSelected= document.getElementById("user_selected_id");

    const userSelectedBgId = document.getElementById("user_selected_image_id");
    const computerSelectedBgId = document.getElementById("computer_selected_image_id");
    const youWinP = document.getElementById("you_win_p");
    const againstPcP = document.getElementById("against_pc_p");

    try {
      gameStatus.style.display = "none";
    }
    catch(err) {
      console.log(err);
      console.log(err.message);
    }
   

    function drawLines() {
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      const rockCenter = getCenterPosition(choices[0]);
      const paperCenter = getCenterPosition(choices[1]);
      const scissorsCenter = getCenterPosition(choices[2]);
  
      ctx.beginPath();
      ctx.moveTo(rockCenter.x, rockCenter.y);
      ctx.lineTo(paperCenter.x, paperCenter.y);
      ctx.lineTo(scissorsCenter.x, scissorsCenter.y);
      ctx.closePath();
  
      ctx.strokeStyle = "#000000A3";
      ctx.lineWidth = 10;
      ctx.stroke();
      }
      catch(err) {
        console.log(err);
        console.log(err.message);
      }
      

      
    }
  
    function getCenterPosition(element) {
      const rect = element.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
  
      const centerX = rect.left + rect.width / 2 - canvasRect.left;
      const centerY = rect.top + rect.height / 2 - canvasRect.top;
  
      return { x: centerX, y: centerY };
    }
  
    function computerChoice() {
      const choicesArray = ["rock", "paper", "scissors"];
      const randomIndex = Math.floor(Math.random() * 3);
      return choicesArray[randomIndex];
    }
  
    function determineWinner(userChoice, computerChoice) {
      var result ="";
      if (userChoice === computerChoice) {
        result = "TIE UP";
      } else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
      ) {
        result = "YOU WIN";
      } else {
        result = "YOU LOST";
      }

  
      return result;
    }
  

    function updateGameStatus(result, userChoice, computerChoice){
      if (gameStatus.style.display === "none") {
        gameStatus.style.display = "block";
        gameContainer.style.display = "none";
      } 

      youWinP.textContent = result;

      if(result == "TIE UP"){
        againstPcP.style.display = "none";
        userCircleId.style.display = "none";
        computerCircleId.style.display = "none";
      }

      if (result === "YOU WIN") {
        userCircleId.style.display = "block";
        computerCircleId.style.display = "none";
      } else if (result === "YOU LOST") {
        computerCircleId.style.display = "block";
        userCircleId.style.display = "none";
      }
      if(userChoice == "rock")
      {
        userSelectedBgId.src = "images/rock_full_image.png";
      }
      else if(userChoice == "paper")
      {
        userSelectedBgId.src = "images/paper_full_image.png";
      }
      else 
      {
        userSelectedBgId.src = "images/scissor_full_image.png";
      }

      if(computerChoice== "rock")
      {
        computerSelectedBgId.src ="images/rock_full_image.png";
      }
      else if(computerChoice == "paper")
      {
        computerSelectedBgId.src = "images/paper_full_image.png";
      }
      else 
      {
        computerSelectedBgId.src = "images/scissor_full_image.png";
      }
      
    }

  
    function updateScores(result) {
      if (result === "YOU WIN") {
        userScore++;
      } else if (result === "YOU LOST") {
        computerScore++;
      }
  
      // Update and display the scores
      localStorage.setItem("userScore", userScore);
      localStorage.setItem("computerScore", computerScore);
      console.log(userScore);
      console.log(computerScore);

      userScoreDisplay.textContent = userScore;
      computerScoreDisplay.textContent = computerScore;

      
    }

    function handleClick(userChoice) {
      const compChoice = computerChoice();
      const result = determineWinner(userChoice, compChoice);
  
      const myObj = {compChoice:compChoice, userChoice:userChoice,result:result};
      console.log(myObj);
      
      updateScores(result);

      updateGameStatus(result,userChoice,compChoice);

    }
  
    choices.forEach((choice) => {
      choice.addEventListener("click", () => {
        const selectedChoice = choice.id;
        handleClick(selectedChoice);
      });
    });

    drawLines();
    //startGame();
    userScoreDisplay.textContent = userScore;
    computerScoreDisplay.textContent = computerScore;

  
   
  });

  function playAgain(){
    if (gameContainer.style.display === "none") {
      gameContainer.style.display = "block";
      gameStatus.style.display = "none";
    } 
  }

  function openDialog() {
    const customDialog = document.getElementById("customDialog");
    customDialog.style.display = "block";
  }
  
  function closeDialog() {
    const customDialog = document.getElementById("customDialog");
    customDialog.style.display = "none";
  }
  
  // Close the dialog if the user clicks outside of it
  window.addEventListener("click", function (event) {
    const customDialog = document.getElementById("customDialog");
    if (event.target === customDialog) {
      customDialog.style.display = "none";
    }
  });

 