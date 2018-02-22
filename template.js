const table = require('markdown-table')

const generateTable = arr => table(arr)

const template = (name, table) => {
  return (
`# ${name}'s report
1. First list
2. Second list
3. Third list
**bold**

${table}`
  )
}

module.exports = {
  template,
  generateTable
}
