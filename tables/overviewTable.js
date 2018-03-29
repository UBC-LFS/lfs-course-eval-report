const table = require('markdown-table')

const overviewTable = instructorSections => {
  const header = [
    'course',
    'term',
    'class size',
    'response rate',
    'meets minimum',
    'UMI6 mean',
    'UMI6 Fac mean (# of sections)',
    'UMI6 Dept mean (# of sections)',
    'UMI6 % favourable'
  ]
  const instructorResults = instructorSections.map(sectionData => {
    const {
      year,
      term,
      course,
      section,
      enrolment,
      responseRate,
      meetsMin,
      facultyStats,
      departmentStats,
      sectionStats
    } = sectionData

    return [
      course + ' ' + section,
      year + term,
      enrolment,
      Math.round(responseRate * 100) + '%',
      meetsMin,
      sectionStats.average,
      facultyStats.average + ` (${facultyStats.length})`,
      departmentStats.average + ` (${departmentStats.length})`,
      Math.round(sectionStats.percentFavourable * 100) + '%'
    ]
  })
  return table([header, ...instructorResults])
}

module.exports = overviewTable
