//Index, Row, Column
const cells = [
  {
    index: 0,
    row: 'A',
    col: '1'
  },
  {
    index: 1,
    row: 'A',
    col: '2'
  },
  {
    index: 2,
    row: 'A',
    col: '3'
  },
  {
    index: 3,
    row: 'A',
    col: '4'
  },
  {
    index: 4,
    row: 'A',
    col: '5'
  },
  {
    index: 5,
    row: 'A',
    col: '6'
  },
  {
    index: 6,
    row: 'A',
    col: '7'
  },
  {
    index: 7,
    row: 'A',
    col: '8'
  },
  {
    index: 8,
    row: 'A',
    col: '9'
  },
  {
    index: 9,
    row: 'B',
    col: '1'
  },
  {
    index: 10,
    row: 'B',
    col: '2'
  },
  {
    index: 11,
    row: 'B',
    col: '3'
  },
  {
    index: 12,
    row: 'B',
    col: '4'
  },
  {
    index: 13,
    row: 'B',
    col: '5'
  },
  {
    index: 14,
    row: 'B',
    col: '6'
  },
  {
    index: 15,
    row: 'B',
    col: '7'
  },
  {
    index: 16,
    row: 'B',
    col: '8'
  },
  {
    index: 17,
    row: 'B',
    col: '9'
  },
  {
    index: 18,
    row: 'C',
    col: '1'
  },
  {
    index: 19,
    row: 'C',
    col: '2'
  },
  {
    index: 20,
    row: 'C',
    col: '3'
  },
  {
    index: 21,
    row: 'C',
    col: '4'
  },
  {
    index: 22,
    row: 'C',
    col: '5'
  },
  {
    index: 23,
    row: 'C',
    col: '6'
  },
  {
    index: 24,
    row: 'C',
    col: '7'
  },
  {
    index: 25,
    row: 'C',
    col: '8'
  },
  {
    index: 26,
    row: 'C',
    col: '9'
  },
  {
    index: 27,
    row: 'D',
    col: '1'
  },
  {
    index: 28,
    row: 'D',
    col: '2'
  },
  {
    index: 29,
    row: 'D',
    col: '3'
  },
  {
    index: 30,
    row: 'D',
    col: '4'
  },
  {
    index: 31,
    row: 'D',
    col: '5'
  },
  {
    index: 32,
    row: 'D',
    col: '6'
  },
  {
    index: 33,
    row: 'D',
    col: '7'
  },
  {
    index: 34,
    row: 'D',
    col: '8'
  },
  {
    index: 35,
    row: 'D',
    col: '9'
  },
  {
    index: 36,
    row: 'E',
    col: '1'
  },
  {
    index: 37,
    row: 'E',
    col: '2'
  },
  {
    index: 38,
    row: 'E',
    col: '3'
  },
  {
    index: 39,
    row: 'E',
    col: '4'
  },
  {
    index: 40,
    row: 'E',
    col: '5'
  },
  {
    index: 41,
    row: 'E',
    col: '6'
  },
  {
    index: 42,
    row: 'E',
    col: '7'
  },
  {
    index: 43,
    row: 'E',
    col: '8'
  },
  {
    index: 44,
    row: 'E',
    col: '9'
  },
  {
    index: 45,
    row: 'F',
    col: '1'
  },
  {
    index: 46,
    row: 'F',
    col: '2'
  },
  {
    index: 47,
    row: 'F',
    col: '3'
  },
  {
    index: 48,
    row: 'F',
    col: '4'
  },
  {
    index: 49,
    row: 'F',
    col: '5'
  },
  {
    index: 50,
    row: 'F',
    col: '6'
  },
  {
    index: 51,
    row: 'F',
    col: '7'
  },
  {
    index: 52,
    row: 'F',
    col: '8'
  },
  {
    index: 53,
    row: 'F',
    col: '9'
  },
  {
    index: 54,
    row: 'G',
    col: '1'
  },
  {
    index: 55,
    row: 'G',
    col: '2'
  },
  {
    index: 56,
    row: 'G',
    col: '3'
  },
  {
    index: 57,
    row: 'G',
    col: '4'
  },
  {
    index: 58,
    row: 'G',
    col: '5'
  },
  {
    index: 59,
    row: 'G',
    col: '6'
  },
  {
    index: 60,
    row: 'G',
    col: '7'
  },
  {
    index: 61,
    row: 'G',
    col: '8'
  },
  {
    index: 62,
    row: 'G',
    col: '9'
  },
  {
    index: 63,
    row: 'H',
    col: '1'
  },
  {
    index: 64,
    row: 'H',
    col: '2'
  },
  {
    index: 65,
    row: 'H',
    col: '3'
  },
  {
    index: 66,
    row: 'H',
    col: '4'
  },
  {
    index: 67,
    row: 'H',
    col: '5'
  },
  {
    index: 68,
    row: 'H',
    col: '6'
  },
  {
    index: 69,
    row: 'H',
    col: '7'
  },
  {
    index: 70,
    row: 'H',
    col: '8'
  },
  {
    index: 71,
    row: 'H',
    col: '9'
  },
  {
    index: 72,
    row: 'I',
    col: '1'
  },
  {
    index: 73,
    row: 'I',
    col: '2'
  },
  {
    index: 74,
    row: 'I',
    col: '3'
  },
  {
    index: 75,
    row: 'I',
    col: '4'
  },
  {
    index: 76,
    row: 'I',
    col: '5'
  },
  {
    index: 77,
    row: 'I',
    col: '6'
  },
  {
    index: 78,
    row: 'I',
    col: '7'
  },
  {
    index: 79,
    row: 'I',
    col: '8'
  },
  {
    index: 80,
    row: 'I',
    col: '9'
  },
];
module.exports = cells;