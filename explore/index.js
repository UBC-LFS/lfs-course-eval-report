const readDB = require('../util/readDB')
const { pearsonCorrelation } = require('../util/util')
const R = require('ramda')

const filterMeetsMin = courses => courses.filter(course => course.meetsMin)

const enrolmentVsUMI6 = courses => {
  const enrolments = filterMeetsMin(courses).map(course => course.enrolment)
  console.log(enrolments.length)
  const UMI6 = filterMeetsMin(courses).map(course => course.UMI6.average)
  console.log(UMI6.length)
  return [enrolments, UMI6]
}

readDB('aggregatedData')
  .then(sections => sections.filter(section => section.responseRate > 1))
  .then(x => console.log(x))
  // .then(courses => enrolmentVsUMI6(courses))
  // .then(enrolmentsData => pearsonCorrelation(enrolmentsData, 0, 1))
  // .then(x => console.log(x))
