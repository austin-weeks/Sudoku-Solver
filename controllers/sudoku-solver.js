const cells = require('./cells');
class SudokuSolver {

  constructor() {
    //row name, start index, end index (exclusive)
    this.rows = [
      ['A',   0, 9],
      ['B',  9, 18],
      ['C', 18, 27],
      ['D', 27, 36],
      ['E', 36, 45],
      ['F', 45, 54],
      ['G', 54, 63],
      ['H', 63, 72],
      ['I', 72, 81]
    ];
    //column name, indexes
    this.columns = [
      ['1', [0,  9, 18, 27, 36, 45, 54, 63, 72]],
      ['2', [1, 10, 19, 28, 37, 46, 55, 64, 73]],
      ['3', [2, 11, 20, 29, 38, 47, 56, 65, 74]],
      ['4', [3, 12, 21, 30, 39, 48, 57, 66, 75]],
      ['5', [4, 13, 22, 31, 40, 49, 58, 67, 76]],
      ['6', [5, 14, 23, 32, 41, 50, 59, 68, 77]],
      ['7', [6, 15, 24, 33, 42, 51, 60, 69, 78]],
      ['8', [7, 16, 25, 34, 43, 52, 61, 70, 79]],
      ['9', [8, 17, 26, 35, 44, 53, 62, 71, 80]]
    ];
    //region name, indexes
    this.regions = [
      ['top-left',      [ 0,  1,  2,  9, 10, 11, 18, 19, 20]],
      ['top-center',    [ 3,  4,  5, 12, 13, 14, 21, 22, 23]],
      ['top-right',     [ 6,  7,  8, 15, 16, 17, 24, 25, 26]],
      ['middle-left',   [27, 28, 29, 36, 37, 38, 45, 46, 47]],
      ['middle-center', [30, 31, 32, 39, 40, 41, 48, 49, 50]],
      ['middle-right',  [33, 34, 35, 42, 43, 44, 51, 52, 53]],
      ['bottom-left',   [54, 55, 56, 63, 64, 65, 72, 73, 74]],
      ['bottom-center', [57, 58, 59, 66, 67, 68, 75, 76, 77]],
      ['bottom-right',  [60, 61, 62, 69, 70, 71, 78, 79, 80]]
    ];
  }

  validatePuzzleCharacters(puzzleString) {
    return !puzzleString.match(/[^1-9\.]/gi)
  }
  validatePuzzleLength(puzzleString) {
    return puzzleString.length === 81;
  }
  validate(puzzleString) {
    if (!this.validatePuzzleLength(puzzleString)) return 'invalid length';
    if (!this.validatePuzzleCharacters(puzzleString)) return 'invalid characters';
    return 'valid';
  }

  insertValue(puzzleString, row, column, value) {
    const index = cells.find(cell => cell.row === row && cell.col === column);
    const splitPuzzle = puzzleString.split('');
    splitPuzzle[index] = value;
    return splitPuzzle.join('');
  }
  isExistingInput(puzzleString, row, column, value) {
    const index = cells.find(cell => cell.row === row && cell.col === column);
    return puzzleString[index] === value;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const newPuzzle = this.insertValue(puzzleString, row, column, value);
    const rowEl = this.rows.find(el => el[0] === row);
    const rowStr = newPuzzle.substring(rowEl[1], rowEl[2]);
    return this.validateSet(rowStr);
  }

  checkColPlacement(puzzleString, row, column, value) {
    const newPuzzle = this.insertValue(puzzleString, row, column, value);
    const colEl = this.columns.find(el => el[0] === column);
    let columnStr = '';
    for (const cell of colEl[1]) columnStr += newPuzzle[cell];
    return this.validateSet(columnStr);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let verticalPlacement;
    let horizontalPlacement;
    switch (row) {
      case 'A':
      case 'B':
      case 'C':
        verticalPlacement = 'top'; break;
      case 'D':
      case 'E':
      case 'F':
        verticalPlacement = 'middle'; break;
      case 'G':
      case 'H':
      case 'I':
        verticalPlacement = 'bottom'; break;
      default: return false;
    }
    switch (column) {
      case '1':
      case '2':
      case '3':
        horizontalPlacement = 'left'; break;
      case '4':
      case '5':
      case '6':
        horizontalPlacement = 'center'; break;
      case '7':
      case '8':
      case '9':
        horizontalPlacement = 'right'; break;
      default: return false;
    }
    const newPuzzle = this.insertValue(puzzleString, row, column, value);
    const region = `${verticalPlacement}-${horizontalPlacement}`;
    const regionEl = this.regions.find(el => el[0] === region);
    let regionStr = '';
    for (const cell of regionEl[1]) regionStr += newPuzzle[cell];
    return this.validateSet(regionStr);
  }

  solve(puzzleString) {
    //Check Rows
    console.log(
    this.validateRows(puzzleString));
    //Check Columns
    console.log(
    this.validateColumns(puzzleString));
    //Check Regions
    console.log(
    this.validateRegions(puzzleString));
  }


  validateRows(puzzleString) {
    console.log('ROWS');
    for (const row of this.rows) {
      const rowStr = puzzleString.substring(row[1], row[2]);
      if (!this.validateSet(rowStr)) return false;
    }
    return true;
  }
  validateColumns(puzzleString) {
    console.log('COLUMNS');
    for (const col of this.columns) {
      let columnStr = '';
      for (const cell of col[1]) columnStr += puzzleString[cell];
      if (!this.validateSet(columnStr)) return false;
    }
    return true;
  }
  validateRegions(puzzleString) {
    console.log('REGIONS');
    for (const reg of this.regions) {
      let regionStr = '';
      for (const cell of reg[1]) regionStr += puzzleString[cell];
      if (!this.validateSet(regionStr)) return false;
    }
    return true;
  }

  //Checks for duplicate values
  validateSet(groupingStr) {
    const group = groupingStr.split('');
    const counts = {}
    for (const num of group) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    for (const [key, value] of Object.entries(counts)) {
      if (value !== 1 && key !== '.') return false;
    }
    return true;
  }
}

module.exports = SudokuSolver;

