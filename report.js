const readDB = require('./util/readDB')
const writeInstructorReport = require('./util/writeInstructorReport')
const template = require('./util/template')
const overviewTable = require('./tables/overviewTable')
const { metaProcess, statsForEverySection, dataForScatter } = require('./util/process')
const { trendline, scatterplot } = require('./charts/charts')

readDB('aggregatedData')
  .then(data => {
    const { puids } = metaProcess(data)
    puids.forEach(puid => {
      const name = data
        .find(section => section.PUID === puid)
        .instructorName

      const dataForPuid = statsForEverySection(puid, data)
      const scatterplotData = dataForScatter(dataForPuid)
      const graph = scatterplot(scatterplotData)

      const tables = overviewTable(dataForPuid)

      writeInstructorReport(puid, name, template(name, graph, tables))
    })
  })
