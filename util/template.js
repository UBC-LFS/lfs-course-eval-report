const table = require('markdown-table')

const markdownTables = instructorSections =>
  instructorSections.map(sectionData => {
    const {
      instructorName,
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

    const header = [
      'name',
      'year',
      'term',
      'section',
      'class size',
      'response rate',
      'meets minimum',
      'UMI6 average',
      'UMI 6 percent favourable',
      '# of courses'
    ]
    const instructor = [
      instructorName,
      year,
      term,
      course + ' ' + section,
      enrolment,
      responseRate,
      meetsMin,
      sectionStats.average,
      sectionStats.percentFavourable,
      '-'
    ]
    const faculty = [
      'faculty',
      '-',
      '-',
      '-',
      '-',
      '-',
      '-',
      facultyStats.average,
      facultyStats.percentFavourable,
      facultyStats.length
    ]
    const department = [
      'dept',
      '-',
      '-',
      '-',
      '-',
      '-',
      '-',
      departmentStats.average,
      departmentStats.percentFavourable,
      departmentStats.length
    ]
    return table([header, instructor, faculty, department])
  }).join('\n\n')

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
