const readDB = require('./readDB')
const writeReport = require('./writeReport')
const { generateTable, template } = require('./template')
const { metaProcess, statsForEverySection, sectionsTaughtByInstructor } = require('./process')
const trendline = require('./trendline')
const R = require('ramda')

readDB('aggregatedData')
  .then(data => {
    // console.log(R.uniq(data.map(section => section.courseLevel)))
    // console.log(data.filter(section => section.courseLevel === 5).length)
    const { puids, years } = metaProcess(data)
    puids.forEach(puid => {
      const name = data.find(section => section.PUID === puid).instructorName

      const dataForPuid = statsForEverySection(puid, data)
      const sectionsForPuid = sectionsTaughtByInstructor(puid, data)

      const dataForTrend = sectionsForPuid.map(section => ({ key: section.year + section.term, value: section.UMI6.average }))

      const graph = trendline({ data: dataForTrend })

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
      writeReport(puid, name, template(name, graph, tables))
    })
  })

// console.log(trendline({
//   data: [
//     { key: 'Turkey', value: 123 },
//     { key: 'Canada', value: 13 },
//     { key: 'US', value: 553 },
//     { key: 'England', value: 23 },
//     { key: 'Russia', value: 0 },
//     { key: 'Venezuela', value: 58 },
//     { key: 'France', value: 0 },
//     { key: 'Korea', value: 0 },
//     { key: 'Brazil', value: 15 }
//   ]
// }))
