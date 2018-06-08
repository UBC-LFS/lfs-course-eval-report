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

const sumAllUMICounts = arrOfCounts => ({
  'UMI1': sumCounts(arrOfCounts.map(x => x[0])),
  'UMI2': sumCounts(arrOfCounts.map(x => x[1])),
  'UMI3': sumCounts(arrOfCounts.map(x => x[2])),
  'UMI4': sumCounts(arrOfCounts.map(x => x[3])),
  'UMI5': sumCounts(arrOfCounts.map(x => x[4])),
  'UMI6': sumCounts(arrOfCounts.map(x => x[5]))
})

const sumEnrolment = classes =>
  R.reduce((acc, record) => (acc + record.enrolment), 0, classes)

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

const calculateDispersion = count => {
  count = fillInMissingCounts(count)

  const numberOfResponses = Object.keys(count).reduce((acc, curKey) => (acc += count[curKey]), 0)
  const dispersionObj = {}

  for (let i = 1; i <= 5; i++) {
    const key = String(i)
    const prevKey = String(i - 1)
    dispersionObj[key] = {
      count: count[key],
      proportion: count[key] / numberOfResponses
    }
    if (i === 1) dispersionObj[key].cumulativeProp = dispersionObj[key].proportion
    else dispersionObj[key].cumulativeProp = dispersionObj[prevKey].cumulativeProp + dispersionObj[key].proportion
    dispersionObj[key].oneMinusF = 1 - dispersionObj[key].cumulativeProp
    dispersionObj[key].finalF = dispersionObj[key].cumulativeProp * dispersionObj[key].oneMinusF
  }

  return toTwoDecimal(Object.keys(dispersionObj).reduce((acc, key) => (acc += dispersionObj[key].finalF), 0))
}

function pearsonCorrelation (prefs, p1, p2) {
  let si = []

  for (let key in prefs[p1]) {
    if (prefs[p2][key]) si.push(key)
  }

  let n = si.length

  if (n == 0) return 0

  let sum1 = 0
  for (let i = 0; i < si.length; i++) sum1 += prefs[p1][si[i]]

  let sum2 = 0
  for (let i = 0; i < si.length; i++) sum2 += prefs[p2][si[i]]

  let sum1Sq = 0
  for (let i = 0; i < si.length; i++) {
    sum1Sq += Math.pow(prefs[p1][si[i]], 2)
  }

  let sum2Sq = 0
  for (let i = 0; i < si.length; i++) {
    sum2Sq += Math.pow(prefs[p2][si[i]], 2)
  }

  let pSum = 0
  for (let i = 0; i < si.length; i++) {
    pSum += prefs[p1][si[i]] * prefs[p2][si[i]]
  }

  let num = pSum - (sum1 * sum2 / n)
  let den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) *
    (sum2Sq - Math.pow(sum2, 2) / n))

  if (den == 0) return 0

  return num / den
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
  expandCount,
  calculateDispersion,
  pearsonCorrelation,
  sumEnrolment,
  sumAllUMICounts
}
