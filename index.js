    game.innerHTML = ""
    // canvas = document.getElementsByTagName('canvas').item(0),
    // context = canvas.getContext('2d'),
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
    
    const url = "http://www.puzzlers.org/pub/wordlists/pocket.txt";
    
    let dictionary = "";

    fetch(url)
      .then(res => res.text())
      .then(data => {
        dictionary = data;
      })
    .then(() => {
    console.log(dictionary);
   });
    
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
    console.log(game.style.width);
    game.style.height = game.style.width;
