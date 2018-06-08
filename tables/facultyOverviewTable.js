const table = require('markdown-table')
const {
  toTwoDecimal,
  sumCounts,
  percentFavourable,
  calculateDispersion,
  sumAllUMICounts
} = require('../util/util')

const facultyOverviewTable = data => {
  const header = [
    'Year',
    'LFS mean',
    'UBC mean',
    'LFS dispersion',
    'UBC dispersion',
    'LFS % favourable',
    'UBC % favourable'
  ]

  const summedUMICounts = sumAllUMICounts(data.map(sections => {
    return [
      sections['UMI1'].count,
      sections['UMI2'].count,
      sections['UMI3'].count,
      sections['UMI4'].count,
      sections['UMI5'].count,
      sections['UMI6'].count
    ]
  })
  )

  console.log(summedUMICounts)
}

module.exports = facultyOverviewTable
