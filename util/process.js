const {
  getUniqByKey,
  sortSectionsByYearThenTerm,
  calculateStats,
  sumCounts,
  calculateUMIAvg,
  percentFavourable,
  sumEnrolment
} = require('./util')
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

const dataForKPI = dataForPuid => {
  const years = R.uniq(dataForPuid.map(course => Number(course.year)))
  const curYear = Math.max(...years)
  const curYearSections = dataForPuid.filter(section => section.year === curYear)
  const prevYearSections = dataForPuid.filter(section => section.year === curYear - 1)
  const curUMI6Count = sumCounts(curYearSections.map(section => section.sectionStats.count))
  const prevUMI6Count = sumCounts(prevYearSections.map(section => section.sectionStats.count))
  return {
    currentYear: {
      umi6: calculateUMIAvg(curUMI6Count),
      percentFavourable: percentFavourable(curUMI6Count),
      numCoursesTaught: curYearSections.length,
      numStudentsTaught: sumEnrolment(curYearSections)

    },
    previousYear: {
      umi6: calculateUMIAvg(prevUMI6Count),
      percentFavourable: percentFavourable(prevUMI6Count),
      numCoursesTaught: prevYearSections.length,
      numStudentsTaught: sumEnrolment(prevYearSections)
    },
    lastYear: curYear
  }
}

const dataForDepartmentStatistics = (data, kpiData) => {
  const groupByPUID = R.groupBy(course => course.PUID)(data)
  const UMI6Averages = []
  Object.keys(groupByPUID).forEach(puid => {
    const dataForPUID = groupByPUID[puid]
    const curYearSections = dataForPUID.filter(section => section.year === kpiData.lastYear)
    if (curYearSections.length > 0) {
      const curUMI6Count = sumCounts(curYearSections.map(section => section.UMI6.count))
      UMI6Averages.push(calculateUMIAvg(curUMI6Count))
    }
  })
  UMI6Averages.sort((a, b) => b - a)
  return {
    deptRanking: UMI6Averages.findIndex(umi6 => umi6 === kpiData.currentYear.umi6) + 1,
    deptSize: UMI6Averages.length
  }
}
module.exports = {
  statsForEverySection,
  process,
  metaProcess,
  dataForScatter,
  dataForKPI,
  dataForDepartmentStatistics
}
