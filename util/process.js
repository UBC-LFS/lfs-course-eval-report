const { getUniqByKey, sortSectionsByYearThenTerm, calculateStats } = require('./util')

const metaProcess = data => {
  const uniqPUIDS = getUniqByKey(data, 'PUID')
  const uniqYears = getUniqByKey(data, 'year')
    .sort((a, b) => a - b)

  return {
    puids: uniqPUIDS,
    years: uniqYears
  }
}

const statsForEverySection = (puid, data) => {
  const instructorData = sortSectionsByYearThenTerm(data
    .filter(sections => sections.PUID === puid)
  )

  return instructorData.map(section => {
    const { year, term, dept, course, enrolment, responseRate, meetsMin, instructorName } = section

    const filteredByFaculty = data
      .filter(section => section.year === year &&
        section.term === term)

    const filteredByDept = filteredByFaculty
      .filter(section => section.dept === dept)

    return {
      instructorName,
      year,
      term,
      course,
      dept,
      enrolment,
      responseRate,
      meetsMin,
      section: section.section,
      facultyStats: calculateStats(filteredByFaculty),
      departmentStats: calculateStats(filteredByDept),
      sectionStats: section.UMI6
    }
  })
}

const dataForScatter = dataForPuid => {
  const data = dataForPuid
    .map(stats => ({
      key: stats.year + stats.term,
      value: stats.sectionStats.average,
      enrolment: stats.enrolment,
      facultyStats: stats.facultyStats,
      course: stats.course
    }))
  return {
    data
  }
}

module.exports = {
  statsForEverySection,
  process,
  metaProcess,
  dataForScatter
}
