/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

const htmlBoard = document.querySelector('#board');


/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
 for (let i=0; i<HEIGHT; i++){
   let row = [];
   for (let j=0; j<WIDTH; j++){
     row.push(null)
   }
   board.push(row)
 }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board');

  // TODO: add comment for this code
  const top = document.createElement("tr"); //creates a row on top of the board
  top.setAttribute("id", "column-top"); // sets the id of the row to "column-top"
  top.addEventListener("click", handleClick); // add a click event listener to the row

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);
  // add a cell to the top row. Each cell get an ID with the corresponding x value (e.g. cell 1 has the ID of 0)
  // row and cell is added to htmlBoard

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
  //Creates the html Boad with 6 rows and adds 7 cells to each row. Each cell gets an ID of "y-x" (e.g. 0-0 for the top left cell)
  //Adds the rows to the htmlBoard
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y=5; y >= 0; y--){
   if (!board[y][x]){
     return y
   } 
  }
  return null
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const fit = document.querySelector(`td[id="${y}-${x}"]`);

  const piece = document.createElement('div');
  piece.classList.add("piece");
    if (currPlayer === 1){
      piece.classList.add("p1");
    } else{
      piece.classList.add("p2");
    }
  fit.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert (msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

 
  
  // TODO: check if all cells in board are filled; if so call, call endGame
   // check for tie
   let tie = [...board].flat(1);
   console.log(tie);
   if (tie.every(check => check !==null))
   return endGame ("It is a tie");
 
   

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if (currPlayer === 1){
    currPlayer = 2;
  } else{
    currPlayer = 1;
  }
}


/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) { //iterates through each row
    for (let x = 0; x < WIDTH; x++) { // iterated through each cell in the row
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //creates an array starting from the current cell + 3 fields right
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; //creates an array starting from the current cell + 3 fields up
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // creates an array starting from the current cell + 3 fields diagonally right
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // creates an array starting from the current cell + 3 fields diagonally left

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { //sends array to win function and returns true in case win returns true
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
