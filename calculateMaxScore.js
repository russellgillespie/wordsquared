// This script takes a key varter and a set of the other 25 varterspace
// In the alphabet and calculates the max possible WordSquared score.

// Get KEY varTER
var keyvarter = JSON.parse(sessionStorage.getItem('abcDaily'));
// console.log(keyvarter);

// Get varTER Array
var randomvarters = JSON.parse(sessionStorage.getItem('randDaily'));
// console.log(randomvarters);

//var alphabet = JSON.parse(sessionStorage.getItem('alphabet'));


// Get Dictionary
const wordDict = JSON.parse(sessionStorage.getItem('wordDict'));



// Get QUADRANTS
var possibleQuadrants = [];
possibleQuadrants = returnAllPossibleQuadrantsArray (keyvarter, randomvarters, possibleQuadrants);
// console.log("Possible Quadrants: " + possibleQuadrants);

var maxScore = 0;

//  Initialize Words Possible In Quadrant Array
var wordsPossibleInQuadrants = [[],[],[],[]]


//// BEGIN NESTED loops
// Loop through quadrants
for (const wpQuad in wordsPossibleInQuadrants)
{
  var wpq = wordsPossibleInQuadrants[wpQuad];
  // Initialize KEY varTER + QUADRANT varTERS Array
  //for (item in possibleQuadrants){ item.push(keyvarter); }
  // Loop WORDS in DICTIONARY
  for (const word in wordDict)
  {
    var w = wordDict[word];
    // Initialize varTER-Match counter
    var matchingvartersCount = 0;
    // Initialize includeWord BOOL
    //var includeWord = false;
    // Loop varTERS in WORD
    for (const varter in w)
    {
      var l = w[varter];
      // Loop varTER in CURRENT: KEY+QUADRANT
      for (const quadrant in possibleQuadrants)
      {
        var q = possibleQuadrants[quadrant];
        for (const item in q)
        {
          var i = q[item];
          // if varTER is in WORD, add 1 to counter and break
          if (l == i || l == keyvarter)
          {
            matchingvartersCount += 1;
          }
        }
      }
    }
    // if count equals WORD length push word to POSSIBLE WORDS IN QUADRANT array
    if (matchingvartersCount == w.length)
    {
      wpq.push(w);
      console.log ("adding: " + w);
    }
  }
  console.log("WPIQ_" + ": " + wpq);
}


// function updateScore(current, value, target) {
//     current += value;
//     var t = "";
//     var c = current.toString();
//     var scoreBuffer = 4 - c.length;
//     for (var i=0; i<scoreBuffer; i++){
//       t+="0";
//     }
//     target.innerHTML = t.toString()+c;
//
//     return current;
// }
//
// function matchWordToDict(word, dict) {
//     var w = word.toLowerCase();
//     //console.log(typeof dict);
//     //console.log(dict.indexOf(word));
//     if (dict.indexOf(word) > -1) {
//       return true;
//     } else {
//       return false;
//     }
// }


// Function to calculate all possible quadrants
function returnAllPossibleQuadrantsArray (keyvarter, randomvarters, _possibleQuadrants) {
  // console.log('possibleQuadrants: ' + _possibleQuadrants);
    var gridSize = 5;
    // Loop over possilbe SLICER positions

    for (var slicerCol=1; slicerCol <= 4; slicerCol++) {
      for (var slicerRow=1; slicerRow <= 4; slicerRow++) {
        // console.log('slicerCol: ' + slicerCol);
        // console.log('slicerRow: ' + slicerRow);
        // Serialize SLICER position values
        var slicerValue = (slicerCol*gridSize) + (slicerRow);
        // console.log("#### SlicerValue: " + slicerValue + "####");
        // Initialize Quadrants Container
        var quadrants = [[],[],[],[]];
        // Loop over Grid varTERS
        for (var varterCol=0; varterCol < gridSize; varterCol++) {
          for (var varterRow=0; varterRow < gridSize; varterRow++) {

              //for (var i=0; i < 16; i++) {
                var index = varterCol * gridSize + varterRow;
                // console.log('varterCol: ' + varterCol);
                // console.log('varterRow: ' + varterRow);
                // console.log('slicerCol: ' + slicerCol);
                // console.log('slicerRow: ' + slicerRow);
                // console.log(index);

                var varterValue = randomvarters[varterCol * gridSize + varterRow];
                // console.log("varter value: " + varterValue);
                //console.log("****varterValue: " + varterValue);
                if (varterRow < slicerRow && varterCol < slicerCol) {
                    quadrants[0].push([varterValue]);
                    break;
                } else if (varterRow >= slicerRow && varterCol < slicerCol) {
                    quadrants[1].push(varterValue);
                    break;
                } else if (varterRow < slicerRow && varterCol >= slicerCol) {
                    quadrants[2].push(varterValue);
                    break;
                } else if (varterRow >= slicerRow && varterCol > slicerCol) {
                    quadrants[3].push(varterValue);
                    break;
                } else
                    console.log('varterValue did not match any test conditions!');
                }
              _possibleQuadrants.push(quadrants);
            }
          }

        }
        return _possibleQuadrants;
    }
