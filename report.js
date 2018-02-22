const readDB = require('./readDB')
const writeReport = require('./writeReport')
const { generateTable, template } = require('./template')
const { metaProcess, process } = require('./process')

readDB('aggregatedData')
  .then(data => {
    const { puids, years } = metaProcess(data)
    puids.forEach(puid => {
      const name = data.find(section => section.PUID === puid).instructorName
      const dataForPuid = process(puid, data)
      const tables = dataForPuid.map(sectionData => {
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

        const header = ['name', 'year', 'term', 'section', 'class size', 'response rate', 'meets minimum', 'UMI6 average', 'UMI 6 percent favourable', '# of courses']
        const instructor = [instructorName, year, term, course + ' ' + section, enrolment, responseRate, meetsMin, sectionStats.average, sectionStats.percentFavourable, '-']
        const faculty = ['faculty', '-', '-', '-', '-', '-', '-', facultyStats.average, facultyStats.percentFavourable, facultyStats.length]
        const department = ['dept', '-', '-', '-', '-', '-', '-', departmentStats.average, departmentStats.percentFavourable, departmentStats.length]
        return generateTable([header, instructor, faculty, department])
      }).join('\n\n')
      writeReport(puid, name, template(name, tables))
    })
  })
