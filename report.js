const readDB = require('./readDB')
const writeReport = require('./writeReport')
const { metaProcess, process } = require('./process')

readDB('aggregatedData')
  .then(data => {
    const { puids, years } = metaProcess(data)
    console.log(process(puids[1], data))
    writeReport('Justin Lee')
  })
