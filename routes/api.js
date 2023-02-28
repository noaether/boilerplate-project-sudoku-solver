const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  const solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;
      if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' });
      }
      const [rowChar, colChar] = coordinate.split('');
      const row = parseInt(rowChar, 36) - 10; // convert base 36 to base 10
      const col = parseInt(colChar, 10) - 1;
      if (isNaN(row) || isNaN(col)) {
        return res.json({ error: 'Invalid coordinate' });
      }
      const isValidRow = solver.checkRowPlacement(puzzle, row, col, value)
      console.log(isValidRow)
      const isValidCol = solver.checkColPlacement(puzzle, row, col, value)
      console.log(isValidCol)
      const isValidRegion = solver.checkRegionPlacement(puzzle, row, col, value);
      console.log(isValidRegion)
      const isValidPlacement = isValidRow && isValidCol && isValidRegion;
      return res.json({ valid: isValidPlacement });
    });

  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;
      if (!puzzle) {
        return res.json({ error: 'Required field missing' });
      }
      const solution = solver.solve(puzzle);
      if (!solution) {
        return res.json({ error: 'Puzzle cannot be solved' });
      }
      return res.json({ solution });
    });
};
