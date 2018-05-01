const template = (name, graph, overviewTable, ...sectionTables) => {
  const sections = sectionTables.join('\n')

  return (
    `![faculty logo](../../_assets/logo.png)
# ${name}'s report

${graph}

${overviewTable}

${sections}
`
  )
}

module.exports = template
