/* global describe, it */

const u = require('../util/util')
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

describe('getUniqByKey', () => {
  it('returns the uniq puids of given section', () => {
    let sections = [
      { PUID: 'ABFDj243GRREGsgsg4' }
    ]
    assert.deepEqual(u.getUniqByKey(sections, 'PUID'), ['ABFDj243GRREGsgsg4'])

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
    assert.deepEqual(u.getUniqByKey(sections, 'PUID'), ['ABFDj243GRREGsgsg4', 'SJFIJBCVBCBC', '1432rgfhuiFDSFSV'])
  })
  it('returns the uniq years of given section', () => {
    let sections = [
      { year: 2017 }
    ]
    assert.deepEqual(u.getUniqByKey(sections, 'year'), [2017])

    sections = [
      { year: 2017 },
      { year: 2017 },
      { year: 2014 },
      { year: 2013 },
      { year: 2012 },
      { year: 2011 }
    ]
    assert.deepEqual(u.getUniqByKey(sections, 'year'), [2017, 2014, 2013, 2012, 2011])
  })
})

describe('sortSectionsByYearThenTerm', () => {
  it('takes sections and returns sections sorted by year and term', () => {
    const input = [
      { year: 2017, term: 'WC' },
      { year: 2015, term: 'WC' },
      { year: 2011, term: 'WC' },
      { year: 2013, term: 'WC' }
    ]
    const output = [
      { year: 2011, term: 'WC' },
      { year: 2013, term: 'WC' },
      { year: 2015, term: 'WC' },
      { year: 2017, term: 'WC' }
    ]
    assert.deepEqual(u.sortSectionsByYearThenTerm(input).reverse(), output)
  })
  it('can handle complex cases', () => {
    const input = [
      { year: 2015, term: 'W1' },
      { year: 2009, term: 'WC' },
      { year: 2016, term: 'W1' },
      { year: 2020, term: 'W1' },
      { year: 2016, term: 'W2' },
      { year: 2011, term: 'S2' },
      { year: 2009, term: 'WA' },
      { year: 2017, term: 'S2' },
      { year: 2011, term: 'S1' }
    ]
    const output = [
      { year: 2009, term: 'WA' },
      { year: 2009, term: 'WC' },
      { year: 2011, term: 'S1' },
      { year: 2011, term: 'S2' },
      { year: 2015, term: 'W1' },
      { year: 2016, term: 'W1' },
      { year: 2016, term: 'W2' },
      { year: 2017, term: 'S2' },
      { year: 2020, term: 'W1' }
    ]
    assert.deepEqual(u.sortSectionsByYearThenTerm(input).reverse(), output)
  })
})

describe('pearsonCorrelation', () => {
  it('calculates correlation', () => {
    assert.deepEqual(u.pearsonCorrelation([[1, 2], [1, 2]], 0, 1), 1)
    assert.deepEqual(u.pearsonCorrelation([[1, 2], [2, 1]], 0, 1), -1)
    assert.deepEqual(u.pearsonCorrelation([[1, 2, 3], [1, 2, 3]], 0, 1), 1)
    assert.deepEqual(u.pearsonCorrelation([[1, 2, 7, 1, 2, 4, 5, 6, 71, 23, 5342], [1, 23, 5, 25, 123, 6, 8, 15, -1923, 123, 0]], 0, 1), 1)
  })
})
