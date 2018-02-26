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

const getUniqByKey = (sections, key) => R.uniq(sections.map(section => section[key]))

const sortSectionsByYearThenTerm = sections => {
  const order = {
    'S1': 0,
    'SA': 1,
    'S2': 2,
    'S': 3,
    'W1': 4,
    'WA': 5,
    'W2': 6,
    'WC': 7,
    'W': 8
  }
  return sections.sort((a, b) => {
    if (a.year === b.year) {
      return (order[a.term] < order[b.term]) ? -1 : (order[a.term] > order[b.term]) ? 1 : 0
    } else {
      return a.year < b.year ? -1 : 1
    }
  }).reverse()
}

const calculateStats = (sections, UMI = 'UMI6') => {
  const counts = sumCounts(sections.map(section => section[UMI].count))
  return {
    average: calculateUMIAvg(counts),
    percentFavourable: percentFavourable(counts),
    length: sections.length
  }
}

const expandCount = count => {
  let result = []
  Object.keys(count).map(x => {
    const temp = Array(count[x]).fill(Number(x))
    result = [...result, ...temp]
  })
  return result
}

module.exports = {
  toTwoDecimal,
  fillInMissingCounts,
  calculateUMIAvg,
  sumCounts,
  percentFavourable,
  getUniqByKey,
  sortSectionsByYearThenTerm,
  calculateStats,
  expandCount
}
