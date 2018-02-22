const readDB = require('./readDB')

readDB('aggregatedData')
  .then(data => {
    console.log(data[0])
  })
