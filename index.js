'use strict';

const init = () => {
  
  const html = document.getElementsByTagName('html').item(0),
    game = document.getElementById('game');
    game.innerHTML = ""
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  const resize = () => {
    // canvas.width = w = window.innerWidth;
    // canvas.height = h = window.innerHeight;
    // context.font = `${h*.157894737}px monospace`;
    // context.textBaseline = 'middle';
    // context.textAlign = 'center';
  };
  
  const drawMap = () => {
    
    const guess = "";
    
    const abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const randABC = [];
    
    for (let l=1; l<= 25; l++){
      let nextLetter = abc.splice(getRandomInt(abc.length),1);
      randABC.push(nextLetter);
    }
 
    // LOAD DICTIONARY DATA FROM JSON
    // Sample JSON Data
    let words = '{"data": ["another","bad","cat","dictionary","even","further","going","here","into","joking","laughter","mostly","night","or","possibly","questions","related","surveys","to","understand","very","well","xylophone","zebras"]}';
    //let url = 'https://github.com/russellgillespie/wordsquared/blob/015c2065548dbc80d92461ec502693147478efd8/dictionary.json';
    let url = './dictionary.json';
    let myWords;
    fetch('./dictionary.txt')
      .then(r =>  r.text())
      .then(e => myWords = e)
    
    console.log (myWords);
      // .then(response => console.log(response));;
    //console.log(myWords);
    //console.log(words);
    
    const wordDict = myWords;
    //console.log(words);
    //console.log(wordDict);
    
    let score = 0;
    let colorPrimary = "#5838ae";
    let colorSecondary = "#ceae23";
    let colorDark = "#121212";
    let colorLight = "#dedede";
    let colorMedium = "#989898";
    let colorUI = "#3499de";
    let colorHover = "rgba(100, 100, 100, 0.5)";
    let slices = 5;
    let sliceSize = 0
    
    // Set size of game frame to viewport
    vw < vh ? game.style.width = vw + "px": game.style.width = vh + "px";
    //console.log(game.style.width);
    game.style.height = game.style.width;
    vw < vh ? sliceSize = vw / (slices + 2) : sliceSize = vh / (slices + 2);
    //console.log(sliceSize);

    // Create Interface buttons
    let keyScore = addTileButton("Score: " + score, 27, sliceSize-2, 4*sliceSize+1, 1, colorUI, colorHover, null, null);
    keyScore.style.width = ((sliceSize-1) * 2)+"px";
    keyScore.removeEventListener ("mouseup", function() {
    target.innerHTML += button.innerHTML;
  });
    keyScore.style.fontSize = 'small';
    
    let answer = addTileButton("",26, sliceSize * 3 - 2, 2*sliceSize+1, (sliceSize * 6)+1, colorUI, colorHover, null, {});
    answer.style.height = sliceSize-2 +"px";
    answer.style.fontSize = 'small'; 
    
    let enter = addTileButton("Enter",26, sliceSize - 1, (sliceSize*5)+1, (sliceSize * 6)+1, colorUI, colorHover, null, function(){
      // Check if innerHTML is valid word
       if (answer.innerHTML.includes(abc[0])){
         if (matchWordToDict(answer.innerHTML.toLowerCase(), wordDict)) { 
           score = updateScore(score, answer.innerHTML.length, keyScore);
         } else { alert("Word not in list!")}
       } else { alert("Key Letter not used!")}
     });
     enter.style.height = sliceSize-2 +"px";
     enter.addEventListener ("mouseup", function(){
       answer.innerHTML = "";
     });
     enter.style.fontSize = 'small'; 


    let keyLetter = addTileButton(abc[0],25, sliceSize-2, (3*sliceSize)+1, 1, colorSecondary, colorHover, answer, function()
            {
              answer.innerHTML += abc[0];
    });
    
    
    let keyReset = addTileButton("Reset",25, 2*sliceSize-2, (sliceSize)+1, 1, colorUI, colorHover, answer, init);

    //keyReset.addEventListener ("mouseup", init);
    keyReset.style.fontSize = 'small';
    keyReset.style.height = sliceSize-2 + "px";
    
    let keyDelete = addTileButton("Delete",28, sliceSize-2, sliceSize+1, (sliceSize * 6)+1, colorUI, colorHover, null, null);
    keyDelete.removeEventListener ("mouseup", function() {
    target.innerHTML += button.innerHTML;
  });
    keyDelete.addEventListener ("mouseup", function(){
      answer.innerHTML = answer.innerHTML.substring(0,answer.innerHTML.length-1);
    });
    keyDelete.style.fontSize = 'small';
    
    let grid = [];
    for (let col=1;col<slices+1;col++){
        for (let row=1;row<slices+1;row++){
          // Cache button metadata
          let buttonIndex = (col-1)*slices+row-1;
          let buttonText = randABC[buttonIndex];
          let xpos = col*sliceSize;
          let ypos = row*sliceSize;
          let xoff = (col+1)*sliceSize;
          let yoff = (row+1)*sliceSize;

          let b = addTileButton(buttonText, buttonIndex, sliceSize-2, xpos+1, ypos+1, colorLight, colorHover, null, function()
            {
              answer.innerHTML += buttonText;
            }
          );
          
          if (col > 1 && col < 6 && row > 1 && row < 6){
            addTileButton("","Slicer_"+row+"_"+col, sliceSize/10, xpos-sliceSize/20, ypos-sliceSize/20, colorUI, colorHover, null, null);
          }
          
        }
    }

  };
  
  const loop = (t) => {
    
    i ++;
    last = t;
    window.requestAnimationFrame(loop);
  };

  let w,  h, last,
    i = 0,
    start = 0;

  window.removeEventListener('load', init);
  window.addEventListener('resize', resize);
  resize();
  drawMap();
  html.classList.remove('no-js');
  html.classList.add('js');
  window.requestAnimationFrame(loop);
};

window.addEventListener('load', init);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function addTileButton(label, index, size, x, y, color, hover, target, listener) {
  // 1. Create the button
  var game = document.getElementById("game");
  var button = document.createElement("button");
  button.name = index;
  button.innerHTML = label;
  button.setAttribute("class", "gameButton");
  button.style.height = size+"px";
  button.style.width = size+"px";
  button.style.left = x+"px";
  button.style.top = y+"px";
  button.style.backgroundColor = color;
  button.style.fontSize = 'x-large';
  
  // 2. Append somewhere
  //var body = document.getElementsByTagName("body")[0];
  game.appendChild(button);

  // 3. Add event handler
  button.addEventListener ("mouseup", listener);
  
  // highlight the mouseover target
  button.addEventListener("mouseenter", (event) => {
  event.target.style.backgroundColor = hover;
  }, false);

  button.addEventListener("mouseout", (event) => {
    event.target.style.backgroundColor = color;
  }, false);

  // 4. Return handle to button
  return button;
};

function updateScore(current, value, target){
  current += value;
  target.innerHTML = "Score: " + current;
  return current;
}

function matchWordToDict(word, dict){
  var w = word.toLowerCase();
  for (const item of dict){
    if (item==w){
      return true;
    } else {
      continue;
    }
    return false;
  }
}
