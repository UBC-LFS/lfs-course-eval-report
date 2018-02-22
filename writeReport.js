const { promisify } = require('util')
const { writeFile, mkdir, existsSync } = require('fs')
const path = require('path')
const createTemplate = require('./template')

const writeFileP = promisify(writeFile)
const mkdirP = promisify(mkdir)

const writeReport = async (instructorName) => {
  if (!existsSync(path.join(__dirname, '/output/', instructorName))) {
    await mkdirP(path.join(__dirname, '/output/', instructorName))
  }
  await writeFileP(path.join(__dirname, '/output/', instructorName, instructorName + '.md'),
    createTemplate(instructorName))
}

module.exports = writeReport
