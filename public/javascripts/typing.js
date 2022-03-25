//Declared
const typingDiv = document.getElementById("typing");
const statsDiv = document.getElementById("stats");
const startGameBtn = document.getElementById("start-game");

// Language Choice
let source = [];

//Finds Prompt based on language selection
async function getPrompt(language){
  // Language Choice
  let source = [];
  //local scope
  let languageSearch = "http://localhost:3001/prompts/"+language;
  fetch(languageSearch,{})
  .then(function (response){
    console.log(response);
    return response.json();
  })
  .then(function (data){
    console.log(data)
    let source = data.prompt
    console.log(source)
    return source
  })
}
  
// Checks for language choice
$(document).on("click", ".language", function () {
  let language = $(this).attr("data-id")
  console.log(language);
  $(".language").addClass("hidden");
  $("#language").addClass("hidden");
  $("#start-game").removeClass("hidden");
  startGame(language);
})

// Starts Game with chosen Language
const startGame = (language) => {
  // Hides Elements
  typingDiv.innerHTML = "";
  statsDiv.innerHTML = "";

  // Parses Language
  if (language == "typescript") {
    language_id_num = 1;
  } else if (language == "javascript") {
    language_id_num = 2;
  } else if (language == "html") {
    language_id_num = 3;
  } else if (language == "css") {
    language_id_num = 4;
  } else if (language == "english") {
    language_id_num = 5;
  }

  //Get Prompts
  getPrompt(language);
  
// // Populate Prompts
// router.get(`/${language}`, async function (req, res) {
//   const exams = await Prompt.findOne({
//     where: { language_id: `${language_id_num}`},
//     order: Sequelize.literal('RAND()'),
//   }).then(function (examPrompt) {
//     res.json(examPrompt)
//   })
//   console.log(examPrompt.prompt)
// });

  // Randomly Selects from Choice Language
  const text = source;

  // console.log(text) // Would display chosen text in Console

  // Splits text array apart by spaces
  const characters = text.split("").map((char) => {
    const span = document.createElement("span");
    span.innerText = char;
    typingDiv.appendChild(span);
    return span;
  });

  // Controls Cursor Position
  let cursorIndex = 0;
  // Tracks Errors
  let errors = 0;
  // Displays Cursor Position
  let cursorCharacter = characters[cursorIndex];
  cursorCharacter.classList.add("cursor");

  // Start Time Declared
  let startTime = null;

  // Time start on keydown
  const keydown = ({ key }) => {
    if (!startTime) {
      startTime = new Date();
    }
    // Tracks KeyCode
    const keyPressed = event.keyCode;

    // if correct
    if (key === cursorCharacter.innerText) {
      cursorCharacter.classList.remove("cursor");
      cursorCharacter.classList.add("done");
      cursorCharacter = characters[++cursorIndex];
    }
    // if wrong
    else if (key !== cursorCharacter.innerText && keyPressed >= 48) {
      cursorCharacter.classList.remove("cursor");
      cursorCharacter.classList.add("wrong");
      cursorCharacter = characters[++cursorIndex];
      ++errors;
    }

    // Backspace
    if (cursorIndex > 0 && keyPressed === 8) {
      cursorCharacter.classList.remove("cursor");
      cursorCharacter = characters[--cursorIndex];
      cursorCharacter.classList.add("cursor");
      cursorCharacter.classList.remove("done");
      console.log(cursorIndex)
      console.log(keyPressed);
      if (cursorCharacter.classList.contains("wrong")) {
        cursorCharacter.classList.remove("wrong");
        --errors;
      }
    }

    //Game Ends
    if (cursorIndex >= characters.length) {
      // game ended state, calculates end time and cpm
      const endTime = new Date();
      const delta = endTime - startTime;
      const seconds = delta / 1000;
      const numberOfCharacters = text.split("").length;
      const cps = parseInt(numberOfCharacters / seconds);
      const cpm = cps * 60.0;
      if (errors === 0) {
        score = parseInt(characters.length * (cpm + 20));
      } else if (errors >= 1) {
        score = parseInt(characters.length * (cpm / errors));
      };
      document.getElementById("stats").innerText = `score = ${score} \n Number of Characters per Minute = ${cpm} \n errors = ${errors}`;
      // If user logged in, post to score database
      if (score) {
        $.ajax("/highscores", {
          method: "POST",
          data: { score }
        }).then(data => console.log(data))
      }
    }

    cursorCharacter.classList.add("cursor");
  };
  // Listens for start of typing
  document.addEventListener("keydown", keydown);
};

