// Array of Words
let words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Saving Words Inside the Local Storage
window.localStorage.setItem("words", JSON.stringify(words));

// Setting Levels
const lvls = {
  Easy: 5,
  Normal: 4,
  Hard: 3,
};

// Default Level
let defaultLevelName = "Normal";
let defaultLevelSecond = lvls[defaultLevelName];

// Catch Selectors
let selectedElement = document.getElementById("select-lvl");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let startButton = document.querySelector(".start");
let TheWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upcomingWords = document.querySelector(".upcoming-words");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let playAgainBtn = document.querySelector(".play-again");

// Control Game Level
selectedElement.addEventListener("change", (event) => {
  defaultLevelName = event.target.value;
  lvlNameSpan.innerHTML = defaultLevelName;
  defaultLevelSecond = lvls[defaultLevelName];
  secondsSpan.innerHTML = defaultLevelSecond;
  timeLeftSpan.innerHTML = defaultLevelSecond;
});

// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSecond;
timeLeftSpan.innerHTML = defaultLevelSecond;
scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = function () {
  return false;
};

// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();
  // Generate Word Function
  genWords();
};

function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get Word Index
  let wordIndex = words.indexOf(randomWord);
  // Remove Word From Array
  words.splice(wordIndex, 1);
  // Show The Random Word
  TheWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = "";
  // Generate Words
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.append(txt);
    upcomingWords.append(div);
  }
  // Start Play Function
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSecond;
  if (words.length === 29) {
    timeLeftSpan.innerHTML = defaultLevelSecond + 2;
  }
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (TheWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (words.length) {
          // Call Generate Word Function
          genWords();
        } else {
          // Removing Upcoming Words Box
          upcomingWords.style.display = "none";
          // Disabled The Input Field
          input.disabled = true;
          // Set Success Message
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congratulation");
          span.append(spanText);
          finishMessage.append(span);
          playAgainBtn.style.display = "block";
        }
      } else {
        // Disabled The Input Field
        input.disabled = true;
        // Set Failure Message
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.append(spanText);
        finishMessage.append(span);
        playAgainBtn.style.display = "block";
      }
    }
  }, 1000);
}

playAgainBtn.addEventListener("click", playAgain);

// Rendering Play Again Function
function playAgain() {
  // Empty The Finish Message Div
  finishMessage.innerHTML = "";
  input.value = "";
  input.disabled = false;
  input.focus();
  // Reset Time Left Span
  timeLeftSpan.innerHTML = defaultLevelSecond;
  // Reset Score
  scoreGot.innerHTML = "0";
  // Show Upcomming Words
  upcomingWords.style.display = "flex";
  // Import Words From Local Storage
  words = JSON.parse(window.localStorage.getItem("words"));
  genWords();
  // Hidden playAgain button
  playAgainBtn.style.display = "none";
}
