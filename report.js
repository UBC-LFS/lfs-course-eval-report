const readDB = require('./util/readDB')
const writeReport = require('./util/writeReport')
const { markdownTables, template } = require('./util/template')
const { metaProcess, statsForEverySection, sectionsTaughtByInstructor } = require('./util/process')
const trendline = require('./charts/trendline')
const R = require('ramda')

readDB('aggregatedData')
  .then(data => {
    const { puids, years } = metaProcess(data)
    puids.forEach(puid => {
      const name = data
        .find(section => section.PUID === puid)
        .instructorName

      const sectionsForPuid = sectionsTaughtByInstructor(puid, data)
      const dataForTrend = sectionsForPuid
        .map(section => ({ key: section.year + section.term, value: section.UMI6.average }))

      const graph = trendline({ data: dataForTrend })

      const dataForPuid = statsForEverySection(puid, data)
      const tables = markdownTables(dataForPuid)
  
      writeReport(puid, name, template(name, graph, tables))
    })
  })
