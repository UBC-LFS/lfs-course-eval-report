const table = require('markdown-table')
const {toTwoDecimal} = require('../util/util.js')
const kpi = data => {
  const currentYear = [
    data.currentYear.umi6,
    data.currentYear.percentFavourable,
    data.currentYear.numCoursesTaught,
    data.currentYear.numStudentsTaught
  ]
  const prevYear = [
    data.previousYear.umi6,
    data.previousYear.percentFavourable,
    data.previousYear.numCoursesTaught,
    data.previousYear.numStudentsTaught
  ]
  const downArrow = `<svg width="20" height="20" class="svg-inline--fa fa-caret-down fa-w-10" aria-hidden="true" data-fa-processed="" data-prefix="fas" data-icon="caret-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="red" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>`
  const upArrow = `<svg width="20" height="20" class="svg-inline--fa fa-caret-up fa-w-10" aria-hidden="true" data-fa-processed="" data-prefix="fas" data-icon="caret-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="green" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path></svg>`
  const comparisons = []
  for (var i = 0; i < currentYear.length; i++) {
    const diff = toTwoDecimal(currentYear[i] - prevYear[i])
    const caption = ' ' + diff + ' (' + (toTwoDecimal(currentYear[i] / prevYear[i] * 100 - 100)) + '%' + ') ' + 'from ' + (parseInt(data.lastYear) - 1)
    if (diff < 0) {
      comparisons.push(downArrow + caption)
    } else if (diff > 0) {
      comparisons.push(upArrow + caption)
    } else { comparisons.push(caption) }
  }
  const values = currentYear.map(x => `<p style="font-size: 30px">` + x + `</p>`)
  const header = [
    `<p style="font-size: 14px">` + 'Mean UMI6' + `</p>`,
    `<p style="font-size: 14px">` + 'Percent Favourable' + `</p>`,
    `<p style="font-size: 14px">` + '# of Courses Taught' + `</p>`,
    `<p style="font-size: 14px">` + '# of Students Taught' + `</p>`
  ]
  const kpiResults = [
    values,
    comparisons
  ]

  return table([header, ...kpiResults], { align: 'c' })
}

module.exports = kpi
