const readDB = require('./util/readDB')
const writeInstructorReport = require('./util/writeInstructorReport')
const template = require('./util/template')
const overviewTable = require('./tables/overviewTable')
const { metaProcess, statsForEverySection, dataForScatter, dataForKPI, dataForDepartmentStatistics } = require('./util/process')
const { trendline, scatterplot } = require('./charts/charts')
const kpi = require('./overview/kpi')

readDB('aggregatedData')
  .then(data => {
    const { puids } = metaProcess(data)
    puids.forEach(puid => {
      const name = data
        .find(section => section.PUID === puid)
        .instructorName

      const dataForPuid = statsForEverySection(puid, data)
      const scatterplotData = dataForScatter(dataForPuid)
      const kpiData = dataForKPI(dataForPuid)
      const departmentStats = dataForDepartmentStatistics(data, kpiData)
      const kpiTiles = kpi(kpiData, departmentStats)
      const graph = scatterplot(scatterplotData)

      const tables = overviewTable(dataForPuid)

      writeInstructorReport(puid, name, template(name, kpiTiles, graph, tables))
    })
  })
