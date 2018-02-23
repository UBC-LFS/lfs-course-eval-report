const readDB = require('./util/readDB')
const writeReport = require('./util/writeReport')
const { markdownTables, template } = require('./util/template')
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
      console.log(dataForPuid)
      const scatterplotData = dataForScatter(dataForPuid)
      const graph = scatterplot(scatterplotData)

      const tables = markdownTables(dataForPuid)

      writeReport(puid, name, template(name, graph, tables))
    })
  })
