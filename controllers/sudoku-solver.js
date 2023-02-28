class SudokuSolver {

  validate(puzzleString) {
    // Check if puzzleString is a valid Sudoku puzzle
    if (puzzleString.length !== 81 || /[^1-9.]/.test(puzzleString)) {
      return 'invalid';
    }

    // Check if puzzle violates any Sudoku rules
    for (let i = 0; i < 81; i++) {
      const row = Math.floor(i / 9);
      const col = i % 9;
      const value = puzzleString.charAt(i);

      if (value !== '.') {
        if (
          !this.checkRowPlacement(puzzleString, row, col, value) ||
          !this.checkColPlacement(puzzleString, row, col, value) ||
          !this.checkRegionPlacement(puzzleString, row, col, value)
        ) {
          return 'invalid';
        }
      }
    }

    // Check if puzzle has empty cells
    if (puzzleString.includes('.')) {
      return 'required';
    }

    // Puzzle is valid
    return 'valid';
  }

  checkRowPlacement(puzzleString, row, column, value) {
    console.log(puzzleString, row, column, value)
    const rowStart = row * 9;
    const rowEnd = rowStart + 9;

    console.log(rowStart, rowEnd)

    for (let i = rowStart; i < rowEnd; i++) {
      if (puzzleString.charAt(i) == value) {
        return true;
      }
    }

    return false;
  }

  checkColPlacement(puzzleString, row, column, value) {
    console.log(puzzleString, row, column, value)

    const colStart = column;
    const colEnd = colStart + 72;

    console.log(colStart, colEnd);

    for (let i = colStart; i <= colEnd; i += 9) {
      if (puzzleString.charAt(i) == value) {
        return true;
      }
    }

    return false;
  }


  checkRegionPlacement(puzzleString, row, column, value) {
    console.log(puzzleString, row, column, value)

    const regionRowStart = Math.floor(row / 3) * 3;
    const regionColStart = Math.floor(column / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const rowIdx = regionRowStart + i;
        const colIdx = regionColStart + j;
        const idx = rowIdx * 9 + colIdx;
        if (puzzleString.charAt(idx) == value) {
          return true;
        }
      }
    }

    return false;
  }

  solve(puzzleString) {
    const puzzleArray = puzzleString.split('');
    const solution = [];

    const solveHelper = (puzzle) => {
      const emptyIndex = puzzle.findIndex((cell) => cell === '.');

      if (emptyIndex === -1) {
        solution.push(puzzle.join(''));
        return;
      }

      const row = Math.floor(emptyIndex / 9);
      const col = emptyIndex % 9;

      for (let i = 1; i <= 9; i++) {
        const value = i.toString();

        if (this.checkRowPlacement(puzzle.join(''), row, col, value) &&
            this.checkColPlacement(puzzle.join(''), row, col, value) &&
            this.checkRegionPlacement(puzzle.join(''), row, col, value)) {
          puzzle[emptyIndex] = value;
          solveHelper(puzzle);
          puzzle[emptyIndex] = '.';
        }
      }
    }

    solveHelper(puzzleArray);
    return solution;
  }

  /*
    solveHelper(puzzle, puzzleString) {
    const emptyCell = this.findEmptyCell(puzzle);

    if (!emptyCell) {
      return true;
    }

    const [row, col] = emptyCell;

    for (let i = 1; i <= 9; i++) {
      const value = i.toString();

      if (this.checkRowPlacement(puzzleString, row, col, value) &&
          this.checkColPlacement(puzzleString, row, col, value) &&
          this.checkRegionPlacement(puzzleString, row, col, value)) {
        puzzle[row][col] = value;

        if (this.solveHelper(puzzle, puzzleString)) {
          return true;
        }

        puzzle[row][col] = '.';
      }
    }

    return false;
  }
*/

  findEmptyCell(puzzle) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (puzzle[row][col] === '.') {
          return [row, col];
        }
      }
    }

    return null;
  }

  parsePuzzleString(puzzleString) {
    const puzzle = [];

    for (let i = 0; i < 81; i += 9) {
      puzzle.push(puzzleString.slice(i, i + 9).split(''));
    }

    return puzzle;
  }

  formatPuzzle(puzzle) {
    return puzzle.map(row => row.join('')).join('');
  }
  isValidPuzzle(puzzle, puzzleString) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const value = puzzle[row][col];

        if (value !== '.') {
          if (!this.checkRowPlacement(puzzleString, row, col, value) ||
              !this.checkColPlacement(puzzleString, row, col, value) ||
              !this.checkRegionPlacement(puzzleString, row, col, value)) {
            return false;
          }
        }
      }
    }

    return true;
  }
}

module.exports = SudokuSolver;

