const R = require('ramda')

const toTwoDecimal = decimal => Math.round(decimal * 100) / 100

const fillInMissingCounts = count => {
  for (let i = 1; i <= 5; i++) {
    const key = String(i)
    if (!count.hasOwnProperty(key)) count[key] = 0
  }
  return count
}

const calculateUMIAvg = count => {
  count = fillInMissingCounts(count)

  const numberOfResponses = Object.keys(count).reduce((acc, curKey) => (acc += count[curKey]), 0)
  const UMITimesCount = Object.keys(count).reduce((acc, key) => (acc += count[key] * Number(key)), 0)

  return toTwoDecimal(UMITimesCount / numberOfResponses)
}

const sumCounts = counts => counts.reduce((acc, cur) => {
  cur = fillInMissingCounts(cur)
  for (let scoreIndex = 1; scoreIndex <= 5; scoreIndex++) {
    if (acc[scoreIndex + '']) {
      acc[scoreIndex + ''] = acc[scoreIndex + ''] + cur[scoreIndex + '']
    } else acc[scoreIndex + ''] = cur[scoreIndex + '']
  }
  return acc
}, {})

const percentFavourable = count => {
  count = fillInMissingCounts(count)

  const numberOfResponses = Object.keys(count).reduce((acc, curKey) => (acc += count[curKey]), 0)
  const numberOf4and5s = R.add(R.prop('4', count), R.prop('5', count))

  return toTwoDecimal(numberOf4and5s / numberOfResponses)
}

const getUniqPuids = sections => R.uniq(sections.map(section => section.PUID))

module.exports = {
  toTwoDecimal,
  fillInMissingCounts,
  calculateUMIAvg,
  sumCounts,
  percentFavourable,
  getUniqPuids
}
