// 2022-02-09
let daily = JSON.parse(sessionStorage.getItem('daily'));
//console.log("Daily: " + daily);

let rand = [['F'],['W'],['B'],['T'],['N'],['R'],['H'],['P'],['I'],['J'],['G'],['D'],['U'],['X'],['S'],['K'],['V'],['M'],['C'],['Z'],['O'],['Y'],['Q'],['L'],['A']];

let abc = "E";

if (daily == null || daily != rand) {
 //console.log('Loading Daily');
 sessionStorage.setItem('randDaily', JSON.stringify(rand));
 sessionStorage.setItem('abcDaily', JSON.stringify(abc));
};
//console.log (sessionStorage.getItem('randDaily'));
//console.log (sessionStorage.getItem('abcDaily'));



[['F'],['W'],['B'],['T'],['N'],['R'],['H'],['P'],['I'],['J'],['G'],['D'],['U'],['X'],['S'],['K'],['V'],['M'],['C'],['Z'],['O'],['Y'],['Q'],['L'],['A']]

// 2022-02-11
// let rand = [["Q"],["C"],["R"],["O"],["H"],["P"],["T"],["E"],["N"],["L"],["F"],["J"],["W"],["U"],["M"],["K"],["S"],["A"],["G"],["Z"],["D"],["V"],["X"],["Y"],["I"]];
//
// let abc = "B";


// 2022-02-10
// let rand = [["O"],["G"],["W"],["J"],["Z"],["B"],["Y"],["L"],["U"],["S"],["P"],["N"],["D"],["E"],["F"],["K"],["C"],["V"],["Q"],["H"],["T"],["M"],["A"],["R"],["X"]];
//
// let abc = "I";

// 2022-02-09
// if (JSON.parse(sessionStorage.getItem('daily')) == null) {
 // console.log('Loading Daily');
 // sessionStorage.setItem('randDaily', JSON.stringify(
 //   [["Q"],["G"],["C"],["K"],["S"],["P"],["V"],["T"],["X"],["Y"],["O"],["I"],["A"],["N"],["B"],["U"],["L"],["W"],["H"],["Z"],["E"],["F"],["M"],["J"],["R"]]
 // ));
 // sessionStorage.setItem('abcDaily', JSON.stringify("D"));
// };

// 2022-02-08
// if (JSON.parse(sessionStorage.getItem('daily')) == null) {
//  console.log('Loading Daily');
//  sessionStorage.setItem('randDaily', JSON.stringify(
//    [["K"],["X"],["J"],["Y"],["F"],["C"],["Q"],["R"],["M"],["S"],["A"],["U"],["T"],["G"],["Z"],["V"],["W"],["E"],["L"],["H"],["D"],["P"],["I"],["B"],["O"]]
//  ));
//  sessionStorage.setItem('abcDaily', JSON.stringify("N"));
// };
