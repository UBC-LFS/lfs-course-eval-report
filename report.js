const readDB = require('./readDB')
const writeReport = require('./writeReport')
const { generateTable } = require('./template')
const { metaProcess, process } = require('./process')

readDB('aggregatedData')
  .then(data => {
    const { puids, years } = metaProcess(data)
    puids.forEach(puid => {
      const dataForPuid = process(puid, data)
      dataForPuid.forEach(data => {
        
      })
    }))
  })
