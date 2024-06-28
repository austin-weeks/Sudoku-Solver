const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const testPuzzles = require('../controllers/puzzle-strings').puzzlesAndSolutions;

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Solve puzzle with valid puzzle string', done => {
    for (const [puzzle, solution] of testPuzzles) {
      chai.request(server).keepOpen()
        .post('/api/solve')
        .send({puzzle})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.solution, solution);
        });
    }
    done();
  });
  test('Solve puzzle with missing puzzle string', done => {
    chai.request(server).keepOpen()
      .post('/api/solve')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field missing');
        done();
      });
  });
  test('Solve puzzle with invalid characters', done => {
    chai.request(server).keepOpen()
      .post('/api/solve')
      .send({ puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72ab.3'})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid characters in puzzle');
        done();
      });
  });
  test('Solve puzzle with incorrect length', done => {
    chai.request(server).keepOpen()
      .post('/api/solve')
      .send({ puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72.3' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
        done();
      });
  });
  test('Solve puzzle that cannot be solved', done => {
    chai.request(server).keepOpen()
      .post('/api/solve')
      .send({ puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72..33' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Puzzle cannot be solved');
        done();
      });
  });
  test('Check puzzle placement with all fields', done => {
    chai.request(server).keepOpen()
      .post('/api/check')
      .send({
        puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
        coordinate: 'A2',
        value: '4'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isTrue(res.body.valid);
        done();
      });
  });
  test('Check puzzle with single placement conflict', done => {
    chai.request(server).keepOpen()
      .post('/api/check')
      .send({
        puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
        coordinate: 'A2',
        value: '1'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isFalse(res.body.valid);
        assert.lengthOf(res.body.conflict, 1);
        done();
      });
  });
  test('Check puzzle with multiple placement conflicts', done => {
    chai.request(server).keepOpen()
      .post('/api/check')
      .send({
        puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
        coordinate: 'A2',
        value: '2'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isFalse(res.body.valid);
        assert.lengthOf(res.body.conflict, 2);
        done();
      });
  });
  test('Check puzzle with all placement conflicts', done => {
    chai.request(server).keepOpen()
      .post('/api/check')
      .send({
        puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
        coordinate: 'A2',
        value: '5'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isFalse(res.body.valid);
        assert.lengthOf(res.body.conflict, 3);
        done();
      });
  });
  test('Check puzzle with missing required fields', done => {
    chai.request(server).keepOpen()
      .post('/api/check')
      .send({
        puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
        coordinate: 'A2',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });
  test('Check puzzle with invalid characters', done => {
    chai.request(server).keepOpen()
      .post('/api/check')
      .send({
        puzzle: '5..9ba72.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
        coordinate: 'A2',
        value: '1'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid characters in puzzle');
        done();
      });
  });
  test('Check puzzle with incorrect length', done => {
    chai.request(server).keepOpen()
      .post('/api/check')
      .send({
        puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......416..85.72...3',
        coordinate: 'A2',
        value: '1'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
        done();
      });
  });
  test('Check puzzle with invalid placement coordinate', done => {
    chai.request(server).keepOpen()
      .post('/api/check')
      .send({
        puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
        coordinate: 'Z0',
        value: '5'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid coordinate');
        done();
      });
  });
  test('Check puzzle with invalid placement value', done => {
    chai.request(server).keepOpen()
      .post('/api/check')
      .send({
        puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
        coordinate: 'A2',
        value: '10'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid value')
        done();
      });
  });
});

