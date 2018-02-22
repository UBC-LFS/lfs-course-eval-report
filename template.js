const table = require('markdown-table')

const generateTable = arr => table(arr)

const template = (name, table) => {
  return (
`![faculty logo](../../_assets/logo.png)
# ${name}'s report

${table}`
  )
}

module.exports = {
  template,
  generateTable
}
