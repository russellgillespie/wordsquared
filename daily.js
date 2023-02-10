// 2022-02-09
let daily = JSON.parse(sessionStorage.getItem('daily'));
console.log("Daily: " + daily);

let rand = [["O"],["G"],["W"],["J"],["Z"],["B"],["Y"],["L"],["U"],["S"],["P"],["N"],["D"],["E"],["F"],["K"],["C"],["V"],["Q"],["H"],["T"],["M"],["A"],["R"],["X"]];

let abc = "I";

if (daily == null || daily != rand) {
 console.log('Loading Daily');
 sessionStorage.setItem('randDaily', JSON.stringify(rand));
 sessionStorage.setItem('abcDaily', JSON.stringify(abc));
};
console.log (sessionStorage.getItem('randDaily'));
console.log (sessionStorage.getItem('abcDaily'));

// 2022-02-08
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
