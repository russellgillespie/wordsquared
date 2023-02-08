'use strict';

console.log("!!! PAGE RELOAD !!!");

// Load Dictionary from local storage
const wordDict = JSON.parse(sessionStorage.getItem('wordDict'));
console.log('Loaded Dictionary')

// Create Tutorial Constants
const title = "</br><span class='gameTitle'>WordSquared</span></br></br><span class='subtitle'></br> Introducing DAILY MODE!</br></br>* HOW TO PLAY *</span></br>";

const tutorial = [
  "<span class='tutorial'></br>| 1 |</br>Start the game by pressing a GREEN SLICER button on the grid. This separates the alphabet into QUADRANTS. Careful where you slice... you may want to spread out your VOWELS!</br></span class='tutorial'>",
  "<span class='tutorial'></br>| 2 |</br> Make a 3+ letter WORD by combingng the YELLOW KEY LETTER at the top with LETTERS from only one QUADRANT at at time!</br></span class='tutorial'>",
  "<span class='tutorial'></br>*** BONUS ***</br>In addition to your base score, you'll get a BONUS based on the size of the QUADRANT used.</br>The BONUS is equal to 25 POINTS minus half the amount of LETTERS in the QUADRANT. Once again, choose your SLICES carefully!</br></span class='tutorial'>",
  "<span class='tutorial'></br></br>**************</br>HOW MANY POINTS</br>CAN YOU SCORE?!</br>**************</br></br></p>"
];
console.log('Tutorial Loaded')

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


// SET SESSION VARIABLES
let gameInfo = {'newGame': '', 'daily': '', 'score': '', 'abc': [], 'rand:': [], 'guessed': []}

//
// for (const [key, value] of Object.entries(gameInfo)) {
//   console.log(`${key}: ${value}`);
//   var i = sessionStorage.getItem(key);
//   console.log(i);
//   (i) ? gameInfo[key] = (JSON.parse(i) || i) : gameInfo[key] = 'default';
// }

console.log (gameInfo);

// gameInfo.newGame = sessionStorage.getItem('newGame') || true;
// gameInfo.daily = sessionStorage.getItem('daily') || true;
// gameInfo.score = sessionStorage.getItem('score') || 0;
// console.log ("sessionStorage abc: " + sessionStorage.getItem('abc') );
// gameInfo.abc = alphabet;
// gameInfo.rand = JSON.parse(sessionStorage.getItem('rand')) || [];
// gameInfo.guessed = JSON.parse(sessionStorage.getItem('guessed')) || [];

gameInfo.newGame = true;
gameInfo.daily = true;
gameInfo.score = 0;
// console.log ("sessionStorage abc: " + sessionStorage.getItem('abc') );
gameInfo.abc = alphabet;
console.log("alphabet:" + alphabet);
gameInfo.rand = [];
gameInfo.guessed = [];
//   'newGame': (sessionStorage.getItem('newGame')) || true),
//   'daily': (JSON.parse(sessionStorage.getItem('daily')) || true),
//   'score': (JSON.parse(sessionStorage.getItem('score')) || 0),
//   'abc': (JSON.parse(sessionStorage.getItem('abc')) || alphabet),
//   'rand': (JSON.parse(sessionStorage.getItem('rand')) || []),
//   'guessed': (JSON.parse(sessionStorage.getItem('guessed')) || [])
// };
//if (gameInfo.newGame == undefined) { gameInfo.newGame = false;}

// if (gameInfo.newGame == true) {
//   sessionStorage.setItem('newGame', JSON.stringify(true));
// } else {
//   console.log('Session Data for New Game already Exists!');
// }

// let newGame = (JSON.parse(sessionStorage.getItem('newGame')) === 'true');

// GAME MODES
let gameModes = ['Normal', 'Vowels', 'Random', 'Hard' ];
let slicerModes = ['All', 'Center', 'Corners', 'Octagon'];
let slicerMode = 'All';
let pendingSlicerMode = 'All';
let wordMinLength = 3;

// GAME DATA
let randABC = [];
let score = 0;
let guessedList = [];
let abc = [];
let letter = "";

// LAYOUT DATA
let offset = 2;
let bezel = 4;
let answerText = "";
let answerGroups = [];
let buttonGroups = [
    [],
    [],
    [],
    []
];

//// MAIN INIT FUNCTION
const init = () => {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    console.log(gameInfo);
    let gameStarted = false;
    //gameInfo.newGame = false;

    // VIEWPORT SIZING
    const html = document.getElementsByTagName('html').item(0),
      game = document.getElementById('game');
    game.innerHTML = "";
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    // RESET BOARD
    let tutorialPage = 0;

    const resize = () => {
        // window.width = w = window.innerWidth;
        // window.height = h = window.innerHeight;
        // window.font = `${h*.157894737}px monospace`;
        // window.textBaseline = 'middle';
        // window.textAlign = 'center';
    };

    const drawMap = () => {

        const guess = "";

        // Create and Randomize Alphabet Arrays

        // NEW GAME CHECKS AND INITIALIZATION
        //console.log('gameInfo.newGame: ' + gameInfo.newGame);
        if (gameInfo.newGame) {
          console.log('NEW GAME!');
          gameInfo.newGame = true;
          //gameInfo.daily = gameInfo.daily;
          gameInfo.score = 0;
          console.log(alphabet);
          gameInfo.abc = alphabet;
          console.log(gameInfo.abc);
          gameInfo.rand = [];
          gameInfo.guessed = [];
          console.log(gameInfo);
          //randABC = [];
          //gameInfo.rand = [];
          console.log("abc length: " + gameInfo.abc.length);

          for (let l = 1; l <= 25; l++) {
              console.log(l + ":" + gameInfo.abc);
              let nextLetter = gameInfo.abc.splice(getRandomInt(gameInfo.abc.length), 1);
              console.log(nextLetter);
              //randABC.push(nextLetter);
              gameInfo.rand.push(nextLetter);
          }
          console.log('end letter button group');
          if (gameInfo.daily) {
            console.log('Setting Daily Game Values');
            gameInfo.rand = JSON.parse(sessionStorage.randDaily);
            gameInfo.abc = JSON.parse(sessionStorage.abcDaily);
            console.log("daily variables set: " + gameInfo);
          }
          sessionStorage.setItem('newGame', JSON.stringify(gameInfo.newGame));
          sessionStorage.setItem('abc', JSON.stringify(gameInfo.abc));
          sessionStorage.setItem('rand', JSON.stringify(gameInfo.rand));
          sessionStorage.setItem('score', JSON.stringify(gameInfo.score));
          sessionStorage.setItem('guessed', JSON.stringify(gameInfo.guessed));
        } else {
          gameInfo.abc = JSON.parse(sessionStorage.getItem('abc'))[0];
          gameInfo.rand = JSON.parse(sessionStorage.getItem('rand'));
          gameInfo.score = JSON.parse(sessionStorage.getItem('score'));
          gameInfo.guessed = JSON.parse(sessionStorage.getItem('guessed'));
          gameInfo.newGame = JSON.parse(sessionStorage.getItem('newGame'));
        }


        let slices = 5;
        let sliceSize = 0;

        // INITIALIZE GAME VARIABLES
        if (gameInfo.newGame === false){
          //console.log(gameInfo.guessed);
          guessedList = gameInfo.guessed;
          score = gameInfo.score;
        } else {
          score = 0;
          gameInfo.score = 0;
        }

        // DEFINE GRID VARIABLES
        let buttonList = [];
        let slicerList = [];
        let featureButtons = [];

        // INITIALIZE COLORS
        let colorPrimary = "#5838ae";
        let colorSecondary = "#ceae23";
        let colorDark = "#121212";
        let colorLight = "#dedede";
        let colorMedium = "#ababab";
        let colorUIReset = "#cc2020";
        let colorUILight = "#deca45";
        let colorUI = "#3499ce";
        let colorUIMedium = "#34aabc";
        let colorUIDark = "#015589";
        let colorConsole = "rgba(200, 225, 255, 0.95)";
        let colorHover = "rgba(200, 225, 255, 0.9)";
        let colorSlicer = "rgba(69, 187, 25, .8)";
        let colorSlicerHover = "rgba(69, 187, 25, .9)";

        // Set size of game frame to viewport
        //game.style.height = game.style.width;
        // Set sliceSize based upon viewport's smaller axis
        vw < vh ? sliceSize = vw / (slices + 2) : sliceSize = vh / (slices + 2);

        // CREATE INTERFACE BUTTONS
        // Create Console
        let keyConsole = addTileButton('button', "Welcome to</br>WordSquared!", 'console', sliceSize * 2 - bezel, sliceSize - bezel, sliceSize*3 + offset, offset, 'black', 'black', null, null);
        //keyConsole.style.color = colorConsole;

        // Create Tutorial/Guesses Panel
        // let keyTitle = addTileButton('button', title, 'guessed', sliceSize * 2 - bezel, sliceSize * 1 - bezel, 5 * sliceSize + offset, sliceSize + offset, colorUILight, colorUILight, null, null);

        let keyGuessed = addTileButton('div', title+tutorial[tutorialPage], 'guessed', sliceSize * 2 - bezel, sliceSize * 5 - bezel, 5 * sliceSize + offset, sliceSize*1 + offset, colorUILight, colorUILight, null, null);

        let keyGuessedPrev = addTileButton('button', "<", 'guessed-prev', sliceSize - bezel*2, sliceSize - bezel*2, sliceSize*5 + offset*3, sliceSize*5 + offset, colorUI, colorHover, null, function(){
          tutorialPage = tutorialHelper('prev', tutorialPage, keyGuessed, tutorial);
          keyGuessed.innerHTML = title+tutorial[tutorialPage];
        });

        let keyGuessedNext = addTileButton('button', ">", 'guessed-next', sliceSize - bezel*2, sliceSize - bezel*2, sliceSize*6 + offset*1, sliceSize*5 + offset, colorUI, colorHover, null, function(){
          tutorialPage = tutorialHelper('next', tutorialPage, keyGuessed, tutorial);
          keyGuessed.innerHTML = title+tutorial[tutorialPage];
        });


        // Create Credits Panel
        let keyCredits = addTileButton('button', "WordSquared</br>&#169; Gillespie", 'credits', sliceSize*2 - bezel, sliceSize - bezel, 5 * sliceSize + offset, 6 * sliceSize + offset, colorConsole, colorConsole, null, null);

        // Create Score Panel
        let keyScore = addTileButton('button', "000" + score, 'score', sliceSize*2 - bezel, sliceSize - bezel, sliceSize*0 + offset, offset, colorUIMedium, colorUIMedium, null, null);
        keyScore.removeEventListener("mouseup", function() {
            target.innerHTML += button.innerHTML;
        });

        // Create Answer Panel
        let answer = addTileButton('button', "", 'answer', sliceSize * 3 - bezel, sliceSize - bezel, sliceSize + offset, (sliceSize * 6) + offset, 'black', 'black', null, {});
        //answer.style.color = colorConsole;

        // Create Enter Panel
        let keyEnter = addTileButton('button', "=", 'enter', sliceSize - bezel, sliceSize - bezel, sliceSize * 4 + offset, (sliceSize * 6) + offset, colorUIMedium, colorHover, null, function() {
            // Check if innerHTML is valid word
            answerText = answer.innerHTML;
            var count = countUnique(answerGroups);

            //// MAIN GAME LOGIC ////
            // 1. Trigger if grid not sliced. Click Green Slicer
            if (count > 0) {
            // 2. Ensure only one Quadrant has been used
                if (count == 1) {
            // 3. Answer must be more than 3 letters
                    if (answerText.length >= wordMinLength) {
            // 4. Check if word has already been guessed
                        if (guessedList.indexOf(answerText) == -1) {
            // 5. Check if Key Letter is included
                            if (answerText.includes(gameInfo.abc)) {
            // 6. Validate word in Dictionary
                                if (matchWordToDict(answerText.toLowerCase(), wordDict)) {
            // 7. Count and add points to Score
                                    var scoringLetters = (1 + answerText.length - wordMinLength);
                                    var addPoints = scoringLetters * scoringLetters;
                                    var scaling = 25 - buttonGroups[answerGroups[0]].length;
                                    addPoints += (Math.ceil(Math.round(scaling/2)));
            // 8. Add word to Guessed List
                                    guessedList.push(answerText);
                                    // if (score==0) {
                                    if (gameInfo.score==0) {
                                      keyGuessed.innerHTML = "";
                                    }
                                    var tag = document.createElement("p");
                                    var text = document.createTextNode(answer.innerHTML);
                                    tag.appendChild(text);
                                    keyGuessed.appendChild(tag);
                                    keyConsole.innerHTML = answer.innerHTML + "</br>+ " + addPoints + "!";
                                    // score = updateScore(score, addPoints, keyScore);
                                    gameInfo.score = updateScore(gameInfo.score, addPoints, keyScore);
                                } else {
                                    keyConsole.innerHTML = "Not In</br>DICTIONARY!";
                                }
                            } else {
                                keyConsole.innerHTML = "KEY LETTER</br>Not Used!";
                            }
                        } else {
                            keyConsole.innerHTML = "Already</br>Guessed!";
                        }
                    } else {
                        keyConsole.innerHTML = "WORD</br>Too Short!";
                    }
                } else {
                    keyConsole.innerHTML = "Too Many</br>QUADRANTS!";
                }
            } else {
                keyConsole.innerHTML = "Click A</br>GREEN SLICER!";
            }
        });

        // Create Enter Panel
        //keyEnter.style.height = sliceSize - bezel + "px";
        keyEnter.addEventListener("mouseup", function() {
            answer.innerHTML = "";
            answerGroups = [];
        });

        // Create KeyLetter Panel
        let keyLetter = addTileButton('button', gameInfo.abc[0], 'keyLetter', sliceSize - bezel, sliceSize - bezel, (2 * sliceSize) + offset, offset, colorUILight, colorHover, answer, function() {
            answer.innerHTML += gameInfo.abc;
        });

        // Create Reset Confirm
        let keyResetConfirm = addTileButton('button', ">", 'reset-confirm', sliceSize - bezel, sliceSize - bezel, sliceSize*6 + offset, offset, null, null, answer, function(){
          keyGuessedPrev.classList.add('reset-confirm-show');
          keyGuessedNext.classList.add('reset-confirm-show');
          keyResetConfirm.classList.remove('reset-confirm-show');
          keyResetDeny.classList.remove('reset-confirm-show');
          keyReset.classList.remove('reset-confirm-hide');
          slicerMode = pendingSlicerMode;
          gameInfo.newGame = true;
          sessionStorage.setItem('newGame', JSON.stringify(gameInfo.newGame));
          console.log("daily: " + gameInfo.daily);
          if (gameInfo.daily) {
            DNP.classList.add('daily-on');
            DNP.classList.remove('daily-off');
          } else {
            DNP.classList.add('daily-off');
            DNP.classList.remove('daily-on');
          }
          console.log(gameInfo);
          console.log('RESETTING GAME!');
          init();
        });

        // Create Reset Deny
        let keyResetDeny = addTileButton('button', "X", 'reset-deny', sliceSize - bezel, sliceSize - bezel, sliceSize*5 + offset, offset, null, colorHover, answer, function(){
          keyResetConfirm.classList.remove('reset-confirm-show');
          keyResetDeny.classList.remove('reset-confirm-show');
          keyReset.classList.remove('reset-confirm-hide');

          //console.log(featureButtons);
          for (var i = 0; i < featureButtons.length; i++) {
            var b = featureButtons[i];
            //console.log(b);
            if (b.name.includes(slicerMode)){
              b.classList.remove('passiveGameMode');
              b.classList.add('activeGameMode');
            } else {
              b.classList.remove('activeGameMode');
              b.classList.add('passiveGameMode');
            }
          }
        });

        // Create Reset Panel
        let keyReset = addTileButton('button', "New Game", 'reset', 2 * sliceSize - bezel, sliceSize - bezel, sliceSize*5 + offset, offset, colorUIReset, colorHover, answer, function(){
          keyResetConfirm.classList.add('reset-confirm-show');
          keyResetDeny.classList.add('reset-confirm-show');
          keyReset.classList.add('reset-confirm-hide');
        });


        // Create Delete Panel
        let keyDelete = addTileButton('button', "<", 'delete', sliceSize - bezel, sliceSize - bezel, offset, (sliceSize * 6) + offset, colorUIReset, colorHover, null, null);
        keyDelete.addEventListener("mouseup", function() {
            answer.innerHTML = answer.innerHTML.substring(0, answer.innerHTML.length - 1);
            //console.log(answerGroups);
            answerGroups.pop();
            //console.log(answerGroups);
        });

        //// GENERATE MAIN GRID ////

        // START GRID LOOP
        for (let col = 0; col < slices*2; col++) {
            for (let row = 1; row < slices*2; row++) {

                // Cache button metadata
                var buttonIndex = (col) * slices + row - 1;
                //console.log(gameInfo);
                //console.log("buttonIndex: " + buttonIndex);
                let buttonText = gameInfo.rand[buttonIndex];
                var xpos = col * sliceSize;
                var ypos = row * sliceSize;
                var xoff = (col + offset) * sliceSize;
                var yoff = (row + offset) * sliceSize;

                // Create XY Grid Button
                if (col >= 0 && col < 5 && row > 0 && row < 6) {
                    var b = addTileButton('button', buttonText, "letter", sliceSize - bezel, sliceSize - bezel, xpos + offset, ypos + offset, colorLight, colorHover, null, function() {
                      if (gameStarted) {
                        answer.innerHTML += buttonText;
                      } else {
                        keyConsole.innerHTML = "Click a</br>GREEN SLICER!";
                      }
                    });
                    buttonList.push({"x": col, "y": row, "button": b, "group" : null});
                } //End XY Grid Buttons

                // Create XY Slicer Button
                if (col > 0 && col < 5 && row > 1 && row < 6) {

                  // Query Slicer Mode
                  switch (slicerMode) {
                    case 'All':
                        break;
                    case 'Center':
                        if ((col ==2 || col == 3) && (row ==3 || row == 4)) {
                          break;
                        } else {
                          continue;
                        }
                        break;
                    case 'Corners':
                        if ((col ==1 || col ==4) && (row ==2 || row == 5)) {
                          break;
                        } else {
                          continue;
                    }
                    case 'Octagon':
                        if (((col ==2 || col == 3) && (row ==2 || row == 5)) || ((col == 1 || col == 4) && (row ==3 || row == 4))) {
                          break;
                        } else {
                          continue;
                    }
                    default:
                        console.log("Error Parsing Slicer Modes!");
                  }
                    var hr = addTileButton('button', "", 'slicer', sliceSize*.5 - bezel, sliceSize*.5 - bezel, xpos + sliceSize*.5/-2+offset, ypos + sliceSize*.5/-2+offset, colorSlicer, null, null, null);
                    //// Add Event Handlers
                    // click
                    hr.addEventListener('mouseup', function() {
                        for (var s in slicerList){
                          slicerList[s].classList.add('slicer-hidden');
                          gameStarted = true;
                        }
                        keyGuessed.innerHTML = "";
                        keyGuessedPrev.classList.add('reset-confirm-hide');
                        keyGuessedNext.classList.add('reset-confirm-hide');
                        buttonGroups = handleSlicerButton(col, row, buttonList);
                    });
                    slicerList.push(hr)
                 } // SLICER END

              // GAME MODES
              if (col >= 0 && col < 6 && row > 6 && row < 8) {
                if (col%2==0) {
                  var key = ((row*6-41)+(col/2));
                  var colPos = col/2+1;
                  var hr = addTileButton('button', slicerModes[colPos], slicerModes[colPos], sliceSize*2 - bezel, sliceSize - bezel, xpos + offset, ypos + offset, null, null, null, null);
                  hr.classList.add('gameMode');
                  //// Add Event Handlers
                  // click
                  hr.addEventListener('mouseup', function() {
                      for (var f=0; f < featureButtons.length; f++) {
                        featureButtons[f].classList.remove('activeGameMode')
                        featureButtons[f].classList.add('passiveGameMode');
                        //f.style.backgroundColor = '#cccccc';
                      };
                      var fb = featureButtons[col/2];
                      //fb.style.backgroundColor = '#cc0000';
                      fb.classList.remove('passiveGameMode');
                      fb.classList.add('activeGameMode');

                      pendingSlicerMode = slicerModes[col/2+1];

                      keyResetConfirm.classList.add('reset-confirm-show');
                      keyResetDeny.classList.add('reset-confirm-show');
                      keyReset.classList.add('reset-confirm-hide');
                      DNP.classList.add('daily-off');
                      DNP.classList.remove('daily-on');
                      gameInfo.daily = false;
                      sessionStorage.setItem('daily', JSON.stringify(gameInfo.daily));
                      console.log(fb.name + " Clicked.");
                      console.log(gameInfo);
                  });
                  featureButtons.push(hr);



                } // GAME MODE LOOP END

            } // ROW LOOP END
        } // COL LOOP END
    }; // END GRID LOOP
    let DNP = addTileButton('button', "Daily", 'dnp', sliceSize - bezel, sliceSize - bezel, sliceSize*6 + offset, sliceSize*7 + offset, 'red', 'red', null, function(){
      slicerMode = slicerModes[0];
      pendingSlicerMode = 'All';
      keyResetConfirm.classList.add('reset-confirm-show');
      keyResetDeny.classList.add('reset-confirm-show');
      keyReset.classList.add('reset-confirm-hide');
      DNP.classList.add('daily-on');
      DNP.classList.remove('daily-off');
      for (var f=0; f < featureButtons.length; f++) {
        featureButtons[f].classList.remove('activeGameMode')
        featureButtons[f].classList.add('passiveGameMode');
        //f.style.backgroundColor = '#cccccc';
      };

      gameInfo.daily = true;
      sessionStorage.setItem('daily', JSON.stringify(gameInfo.daily));
      console.log(DNP.name + " Clicked.");
      console.log(gameInfo);
    });
    if (gameInfo.daily) {DNP.classList.add('daily-on');}


    //console.log(featureButtons);
    for (var i = 0; i < featureButtons.length; i++) {
      var b = featureButtons[i];
      //console.log(b);
      if (b.name.includes(slicerMode)){
        b.classList.add('activeGameMode');
      }
    }
    gameInfo.newGame = false;
    sessionStorage.setItem('newGame', JSON.stringify(gameInfo.newgame));
    console.log(gameInfo);
}



    // const loop = (t) => {
    //
    //     i++;
    //     last = t;
    //     window.requestAnimationFrame(loop);
    // };

    // let w, h, last,
    //     i = 0,
    //     start = 0;

    window.removeEventListener('load', init);
    window.addEventListener('resize', resize);
    //resize();
    drawMap();
    html.classList.remove('no-js');
    html.classList.add('js');
    // window.requestAnimationFrame(loop);
};

window.addEventListener('load', init);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function addTileButton(type, label, className, sizex, sizey, x, y, color, hover, target, listener) {
    // 1. Create the button
    var game = document.getElementById("game");
    var button = document.createElement(type);
    button.name = className+"_"+label;
    button.innerHTML = label;
    button.style.height = sizey + "px";
    button.style.width = sizex + "px";
    button.style.left = x + "px";
    button.style.top = y + "px";
    //button.style.backgroundColor = color;
    //button.style.fontSize = 'x-large';
    button.classList.add(className);
    button.classList.add('gameButton');
    // 2. Append somewhere
    //var body = document.getElementsByTagName("body")[0];
    game.appendChild(button);

    // 3. Add event handler
    button.addEventListener("mouseup", listener);

    // // highlight the mouseover target
    // button.addEventListener("mouseenter", (event) => {
    //     event.target.style.backgroundColor = hover;
    // }, false);
    //
    // button.addEventListener("mouseout", (event) => {
    //     event.target.style.backgroundColor = color;
    // }, false);

    // 4. Return handle to button
    return button;
};

function updateScore(current, value, target) {
    current += value;
    var t = "";
    var c = current.toString();
    var scoreBuffer = 4 - c.length;
    for (var i=0; i<scoreBuffer; i++){
      t+="0";
    }
    target.innerHTML = t.toString()+c;

    return current;
}

function matchWordToDict(word, dict) {
    var w = word.toLowerCase();
    //console.log(typeof dict);
    //console.log(dict.indexOf(word));
    if (dict.indexOf(word) > -1) {
      return true;
    } else {
      return false;
    }
}

function handleSlicerButton(x, y, buttons){
    var groups = [
        [],
        [],
        [],
        [],
        []
    ];
    var groupCount = [];
    for (var i in buttons) {
        var b = buttons[i];

        if (b["x"] < x && b["y"] < y) {
            //handle;
            b = slicerHelper(b, "#55ce55", 0);
            b["group"] = 0;
            groups[0].push(b);
            continue;
        }
        else if (b["x"] >= x && b["y"] < y) {
            //handle;
            b = slicerHelper(b, "#9978fa", 1);
            b["group"] = 1;
            groups[1].push(b);
            continue;
        }
        else if (b["x"] < x && b["y"] >= y) {
            //handle;
            b = slicerHelper(b, "#dd9934", 2);
            b["group"] = 2;
            groups[2].push(b);
            continue;
        }
        else if (b["x"] >= x && b["y"] >= y) {
            //handle;
            b = slicerHelper(b, "#3366dd", 3);
            b["group"] = 3;
            groups[3].push(b);
            continue;
        }
        else {
          console.log("Array range error assigning button groups at " + b["x"] + ": " + b["y"]);
        }
    }
    return groups;
}

function slicerHelper(obj, color, group) {
    obj["button"].classList.add('quadrant-'+group);
    //obj["button"].style.backgroundColor = color;
    // highlight the mouseover target
    // obj["button"].removeEventListener("mouseout", (event) => {
    //     event.target.style.backgroundColor = color;
    // }, false);
    //
    // obj["button"].addEventListener("mouseout", (event) => {
    //     event.target.style.backgroundColor = color;
    // }, false);

    obj["button"].addEventListener("mouseup", (event) => {
        answerGroups.push(group);
    }, false);

    return obj;
}

function countUnique(iterable) {
  return new Set(iterable).size;
}

function tutorialHelper (direction, page, element, text) {
  var p = page;
  switch (direction) {
    case 'prev':
      if (p > 0){
        p -= 1;
      } else {
        p = text.length - 1;
      }
      break;
    case 'next':
    if (p < text.length-1){
      p += 1;
    } else {
      p = 0;
    }
      break;
    default:
      "Error in tutorial Pagination Logic";
      break;
    }

    return p;
}

// function newGameHelper (_gameInfo, _newGame, _score, _alphabet, _rand, _guessed) {
//   _gameInfo = {
//     'newGame': true,
//     'score': 0,
//     'abc': alphabet,
//     'rand': [],
//     'guessed': []
//   };
// }
