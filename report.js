const readDB = require('./readDB')

readDB('aggregatedData').then(result => console.log(result))
