'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;
      if (!puzzle || !coordinate || !value) {
        res.json({error: 'Required field(s) missing'});
        return;
      }
      if (coordinate.length !== 2) {
        res.json({error: 'Invalid coordinate'});
        return;
      }
      const coords = coordinate.split('');
      const row = coords[0].toUpperCase();
      const col = coords[1];

      if (!solver.validatePuzzleCharacters(puzzle)) {
        res.json({error: 'Invalid characters in puzzle'})
        return;
      }
      if (!solver.validatePuzzleLength(puzzle)) {
        res.json({error: 'Expected puzzle to be 81 characters long'});
        return;
      }
      if (!row.match(/[A-I]/i) || !col.match(/[1-9]/)) {
        res.json({error: 'Invalid coordinate'});
        return;
      }
      if (value.length !== 1 || !value.match(/[1-9]/)) {
        res.json({error: 'Invalid value'});
        return;
      }
      if (solver.isExistingInput(puzzle, row, col, value)) {
        res.json({valid: true});
        return;
      }

      let conflict = [];
      let puzzleArr = puzzle.split('');
      if (!solver.checkRowPlacement(puzzleArr, row, col, value)) conflict.push('row');
      if (!solver.checkColPlacement(puzzleArr, row, col, value)) conflict.push('column');
      if (!solver.checkRegionPlacement(puzzleArr, row, col, value)) conflict.push('region');

      if (conflict.length === 0) res.json({valid: true});
      else {
        const json = {
          valid: false,
          conflict
        }
        res.json(json);
      }
    });

  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body.puzzle;
      if (!puzzle) {
        res.json({error: 'Required field missing'});
        return;
      }
      const validate = solver.validate(puzzle);
      if (validate === 'invalid length') {
        res.json({error: 'Expected puzzle to be 81 characters long'});
        return;
      }
      if (validate === 'invalid characters') {
        res.json({error: 'Invalid characters in puzzle'});
        return;
      }
      if (validate === 'unsolvable') {
        res.json({error: 'Puzzle cannot be solved'});
        return;
      }
      res.json({
        solution: solver.solve(puzzle)
      });
    });
};
