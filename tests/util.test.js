/* global describe, it */

const u = require('../util')
const assert = require('assert')

describe('calculateToTwoDecimal', () => {
  it('takes a decimal and returns to only two decimal places', () => {
    assert.deepEqual(u.toTwoDecimal(0.00001), 0)
    assert.deepEqual(u.toTwoDecimal(0.1), 0.1)
    assert.deepEqual(u.toTwoDecimal(0.11), 0.11)
    assert.deepEqual(u.toTwoDecimal(0.105), 0.11)
    assert.deepEqual(u.toTwoDecimal(0.105), 0.11)
    assert.deepEqual(u.toTwoDecimal(0.1000), 0.1)
    assert.deepEqual(u.toTwoDecimal(0.10001), 0.1)
    assert.deepEqual(u.toTwoDecimal(0.5), 0.5)
    assert.deepEqual(u.toTwoDecimal(0.55), 0.55)
    assert.deepEqual(u.toTwoDecimal(0.555), 0.56)
  })
})

describe('calculatePercentFavourable', () => {
  it('takes a count object and returns the percent favourable', () => {
    let count = { '1': 1, '2': 1, '3': 1, '4': 1, '5': 1 }
    assert.deepEqual(u.percentFavourable(count), 0.4)

    count = { '1': 5, '2': 5, '3': 5, '4': 5, '5': 5 }
    assert.deepEqual(u.percentFavourable(count), 0.4)

    count = { '1': 0, '2': 0, '3': 0, '4': 4, '5': 4 }
    assert.deepEqual(u.percentFavourable(count), 1)
  })

  it('can handle missing fields in count', () => {
    let count = { '1': 1, '5': 1 }
    assert.deepEqual(u.percentFavourable(count), 0.5)
  })
})

describe('sumCounts', () => {
  it('takes an array of counts and returns the sum of that array', () => {
    let input = [
      { '1': 0, '2': 2, '3': 8, '4': 29, '5': 29 }
    ]
    let output = { '1': 0, '2': 2, '3': 8, '4': 29, '5': 29 }
    assert.deepEqual(u.sumCounts(input), output)

    input = [
      { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 },
      { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 }
    ]
    output = { '1': 2, '2': 4, '3': 6, '4': 8, '5': 10 }
    assert.deepEqual(u.sumCounts(input), output)

    input = [
      { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 },
      { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 },
      { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 }
    ]
    output = { '1': 3, '2': 6, '3': 9, '4': 12, '5': 15 }
    assert.deepEqual(u.sumCounts(input), output)
  })
  it('can handle missing property/values', () => {
    let input = [
      { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 },
      { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 },
      { '2': 2, '3': 3, '4': 4, '5': 5 }
    ]
    let output = { '1': 2, '2': 6, '3': 9, '4': 12, '5': 15 }
    assert.deepEqual(u.sumCounts(input), output)
  })
})

describe('calculatePercentFavourable', () => {
  it('takes a count object and returns the percent favourable', () => {
    let count = { '1': 1, '2': 1, '3': 1, '4': 1, '5': 1 }
    assert.deepEqual(u.percentFavourable(count), 0.4)

    count = { '1': 5, '2': 5, '3': 5, '4': 5, '5': 5 }
    assert.deepEqual(u.percentFavourable(count), 0.4)

    count = { '1': 0, '2': 0, '3': 0, '4': 4, '5': 4 }
    assert.deepEqual(u.percentFavourable(count), 1)
  })

  it('can handle missing fields in count', () => {
    let count = { '1': 1, '5': 1 }
    assert.deepEqual(u.percentFavourable(count), 0.5)
  })
})

describe('calculateUMIAvg', () => {
  it('takes a count object and returns the average of that object', () => {
    let count = { '1': 1, '2': 1, '3': 1, '4': 1, '5': 1 }
    assert.deepEqual(u.calculateUMIAvg(count), 3)

    count = { '1': 5, '2': 5, '3': 5, '4': 5, '5': 5 }
    assert.deepEqual(u.calculateUMIAvg(count), 3)

    count = { '1': 0, '2': 0, '3': 0, '4': 4, '5': 4 }
    assert.deepEqual(u.calculateUMIAvg(count), 4.5)

    count = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 100 }
    assert.deepEqual(u.calculateUMIAvg(count), 5)

    count = { '1': 100, '2': 0, '3': 0, '4': 0, '5': 0 }
    assert.deepEqual(u.calculateUMIAvg(count), 1)

    count = { '1': 0, '2': 0, '3': 0, '4': 1, '5': 1 }
    assert.deepEqual(u.calculateUMIAvg(count), 4.5)

    count = { '1': 1, '2': 0, '3': 0, '4': 0, '5': 1 }
    assert.deepEqual(u.calculateUMIAvg(count), 3)
  })

  it('can handle missing fields in count', () => {
    let count = { '1': 1, '5': 1 }
    assert.deepEqual(u.calculateUMIAvg(count), 3)
  })
})

describe('getUniqPuids', () => {
  it('returns the uniq puids of given section', () => {
    let sections = [
      { PUID: 'ABFDj243GRREGsgsg4' }
    ]
    assert.deepEqual(u.getUniqPuids(sections), ['ABFDj243GRREGsgsg4'])

    sections = [
      { PUID: 'ABFDj243GRREGsgsg4' },
      { PUID: 'ABFDj243GRREGsgsg4' },
      { PUID: 'SJFIJBCVBCBC' },
      { PUID: 'SJFIJBCVBCBC' },
      { PUID: 'ABFDj243GRREGsgsg4' },
      { PUID: 'ABFDj243GRREGsgsg4' },
      { PUID: 'ABFDj243GRREGsgsg4' },
      { PUID: '1432rgfhuiFDSFSV' }
    ]
    assert.deepEqual(u.getUniqPuids(sections), ['ABFDj243GRREGsgsg4', 'SJFIJBCVBCBC', '1432rgfhuiFDSFSV'])
  })
})
