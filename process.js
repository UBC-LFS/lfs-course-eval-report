const { getUniqByKey, sortSectionsByYearThenTerm, calculateStats } = require('./util')
const R = require('ramda')

const metaProcess = data => {
  const uniqPUIDS = getUniqByKey(data, 'PUID')
  const uniqYears = getUniqByKey(data, 'year')
    .sort((a, b) => a - b)

  return {
    puids: uniqPUIDS,
    years: uniqYears
  }
}

const process = (puid, data) => {
  const instructorData = sortSectionsByYearThenTerm(data
    .filter(sections => sections.PUID === puid)
  )

  return instructorData.map(({ year, term, dept }) => {
    const filteredByFaculty = data
      .filter(section => section.year === year &&
                         section.term === term)

    const filteredByDept = filteredByFaculty
      .filter(section => section.dept === dept)

    return {
      year,
      term,
      dept,
      facultyStats: calculateStats(filteredByFaculty),
      departmentStats: calculateStats(filteredByDept)
    }
  })
}

module.exports = {
  metaProcess,
  process
}
