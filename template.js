const table = require('markdown-table')

const generateTable = arr => table(arr)

const template = (name, graph, table) => {
  return (
`![faculty logo](../../_assets/logo.png)
# ${name}'s report

${graph}

${table}`
  )
}

module.exports = {
  template,
  generateTable
}
