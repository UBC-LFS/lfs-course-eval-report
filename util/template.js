const template = (name, kpiTiles, graph, table) => {
  return (
    `![faculty logo](../../_assets/logo.png)
# ${name}'s report

${kpiTiles}

${graph}

${table}
`
  )
}

module.exports = template
