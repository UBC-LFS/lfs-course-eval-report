const table = require('markdown-table')

const markdownTables = instructorSections => {
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
      responseRate,
      meetsMin,
      sectionStats.average,
      facultyStats.average + ` (${facultyStats.length})`,
      departmentStats.average + ` (${departmentStats.length})`,
      Math.round(sectionStats.percentFavourable * 100) + '%'
    ]
  })
  return table([header, ...instructorResults])
}

const template = (name, graph, table) => {
  return (
`![faculty logo](../../_assets/logo.png)
# ${name}'s report

${graph}

${table}`
  )
}

module.exports = {
  template,
  markdownTables
}
