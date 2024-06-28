const chai = require('chai');
const assert = chai.assert;
const testStrings = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;
console.log(testStrings);
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver;

suite('Unit Tests', () => {
  test('Valid input string of 81 chars', () => {
    for (const [puzzle, solution] of testStrings) {
      assert.equal(solver.validate(puzzle), 'valid');
    }
  });
  test('Puzzle string with invalid characters', () => {
    const invalidStr = '..a..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1cb5....4.37.4.3..6..';
    assert.equal(solver.validate(invalidStr), 'invalid characters');
  });
  test('Puzzle string that is not 81 characters', () => {
    const invalidStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3';
    assert.equal(solver.validate(invalidStr), 'invalid length');
  });
  test('Valid row placement', () => {
    const testPuzzle = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
    assert.isTrue(solver.checkRowPlacement(testPuzzle.split(''), 'A', '2', 6));
  });
  test('Invalid row placement', () => {
    const testPuzzle = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
    assert.isFalse(solver.checkRowPlacement(testPuzzle.split(''), 'A', '2', 5));
  });
  test('Valid column placement', () => {
    const testPuzzle = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
    assert.isTrue(solver.checkColPlacement(testPuzzle.split(''), 'C', '1', 1));
  });
  test('Invalid column placement', () => {
    const testPuzzle = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
    assert.isFalse(solver.checkColPlacement(testPuzzle.split(''), 'C', '1', 3));
  });
  test('Valid region placement', () => {
    const testPuzzle = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
    assert.isTrue(solver.checkRegionPlacement(testPuzzle.split(''), 'A', '2', 2));
  });
  test('Invalid region placement', () => {
    const testPuzzle = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
    assert.isFalse(solver.checkRegionPlacement(testPuzzle.split(''), 'A', '2', 3));
  });
  test('Valid puzzle strings pass solver', () => {
    for (const [puzzle, solution] of testStrings) {
      assert.equal(solver.solve(puzzle), solution);
    }
  });
  test('Invalid puzzle strings fail solver', () => {
    const invalidPuzzle = '55.91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
    assert.equal(solver.validate(invalidPuzzle), 'unsolvable');
  });
  test('Solver returns the expected solutions', () => {
    for (const [puzzle, solution] of testStrings) {
      assert.equal(solver.solve(puzzle), solution);
    }
  });
});
