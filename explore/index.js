const readDB = require('../util/readDB')
const { pearsonCorrelation } = require('../util/util')
const R = require('ramda')

const filterMeetsMin = courses => courses.filter(course => course.meetsMin)

const enrolmentVsUMI6 = courses => {
  const enrolments = filterMeetsMin(courses).map(course => course.enrolment)
  const UMI6 = filterMeetsMin(courses).map(course => course.UMI6.average)
  return [enrolments, UMI6]
}

readDB('aggregatedData')
  .then(courses => enrolmentVsUMI6(courses))
  .then(enrolmentsData => pearsonCorrelation(enrolmentsData, 0, 1))
  .then(x => console.log(x))
