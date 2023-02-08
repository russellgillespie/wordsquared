if (JSON.parse(sessionStorage.getItem('daily')) == null) {
  console.log('Loading Daily');
  sessionStorage.setItem('randDaily', JSON.stringify(
    [["K"],["X"],["J"],["Y"],["F"],["C"],["Q"],["R"],["M"],["S"],["A"],["U"],["T"],["G"],["Z"],["V"],["W"],["E"],["L"],["H"],["D"],["P"],["I"],["B"],["O"]]
  ));
  sessionStorage.setItem('abcDaily', JSON.stringify("N"));
};
