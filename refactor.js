//i dont know how to refactor this ive looked up several pages of info about how to refactor es5 > es6
//but this uses no functions that can be turned into fat arrows. and the rest is far too complicated for me to even understand.
function createArray(rows) { //creates a 2 dimensional array of required height
    let arr = [];
    for (let i = 0; i < rows; i++) {
    arr[i] = [];
    }
    return arr;
    }

let theGrid = createArray(gridWidth);

function fillRandom() { //fill the grid randomly
     for (let j = 0; j < gridHeight; j++) { //iterate through rows
     for (let k = 0; k < gridWidth; k++) { //iterate through columns
      let rawRandom = Math.random(); //get a raw random number
      let improvedNum = (rawRandom * 2); //convert it to an int
     let randomBinary = Math.floor(improvedNum);
     if (randomBinary === 1) {
     theGrid[j][k] = 1;
     } else {
     theGrid[j][k] = 0;
        }
        }
        }
        }

function drawGrid() { //draw the contents of the grid onto a canvas
    let c = document.getElementById(“myCanvas”);
     let ctx = c.getContext(“2d”);
     ctx.clearRect(0, 0, 400, 400); //this should clear the canvas ahead of each redraw
      for (let j = 1; j < gridHeight; j++) { //iterate through rows
      for (let k = 1; k < gridWidth; k++) { //iterate through columns
     if (theGrid[j][k] === 1) {
     ctx.fillStyle = “#FF0000”;
     ctx.fillRect(j, k, 1, 1);
            }
            }
            }
            }

function updateGrid() { //perform one iteration of grid update
    for (let j = 1; j < gridHeight – 1; j++) { //iterate through rows
    for (let k = 1; k < gridWidth – 1; k++) { //iterate through columns
    let totalCells = 0;
    //add up the total values for the surrounding cells
    totalCells += theGrid[j – 1][k – 1]; //top left
    totalCells += theGrid[j – 1][k]; //top center
    totalCells += theGrid[j – 1][k + 1]; //top right
    totalCells += theGrid[j][k – 1]; //middle left
    totalCells += theGrid[j][k + 1]; //middle right
    totalCells += theGrid[j + 1][k – 1]; //bottom left
    totalCells += theGrid[j + 1][k]; //bottom center
    totalCells += theGrid[j + 1][k + 1]; //bottom right
    //apply the rules to each cell
    if (theGrid[j][k] === 0) {
    switch (totalCells) {
    case 3:
    mirrorGrid[j][k] = 1; //if cell is dead and has 3 neighbours, switch it on
    break;
    default:
    mirrorGrid[j][k] = 0; //otherwise leave it dead
    }
    } else if (theGrid[j][k] === 1) { //apply rules to living cell
     switch (totalCells) {
    case 0:
    case 1:
    mirrorGrid[j][k] = 0; //die of lonelines
    break;
    case 2:
    case 3:
    mirrorGrid[j][k] = 1; //carry on living
    break;
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    mirrorGrid[j][k] = 0; //die of overcrowding
    break;
    default:
    mirrorGrid[j][k] = 0; //
    }
    }
    }
    }
    //copy mirrorGrid to theGrid
    for (let j = 0; j < gridHeight; j++) { //iterate through rows
    for (let k = 0; k < gridWidth; k++) { //iterate through columns
    theGrid[j][k] = mirrorGrid[j][k];
    }
    }
     }
 function tick() { //main loop
drawGrid();
                    updateGrid();
                    requestAnimationFrame(tick);
                    }