const readDB = require('./util/readDB')
const {
  facultyOverviewTable
} = require('./tables/index')

readDB('aggregatedData')
  .then(data => facultyOverviewTable(data))
