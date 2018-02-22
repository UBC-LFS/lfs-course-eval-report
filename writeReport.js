const { promisify } = require('util')
const { writeFile, mkdir, stat } = require('fs')
const path = require('path')
const createTemplate = require('./report-template')

const writeFileP = promisify(writeFile)
const mkdirP = promisify(mkdir)
const statP = promisify(stat)

const writeReport = async (instructorName) => {
  if (await statP(path.join(__dirname, '/output/'))) {
    await mkdirP(path.join(__dirname, '/output/', instructorName))
  }
  await writeFileP(path.join(__dirname, '/output/', instructorName, instructorName + '.md'),
    createTemplate(instructorName))
}

module.exports = writeReport
