const { promisify } = require('util')
const { writeFile, mkdir, existsSync } = require('fs')
const path = require('path')

const writeFileP = promisify(writeFile)
const mkdirP = promisify(mkdir)

const writeInstructorReport = async (puid, name, report) => {
  const folderPath = path.join(__dirname, '../output/', name + '_' + puid)
  if (!existsSync(path.join(folderPath))) {
    await mkdirP(path.join(folderPath))
  }
  await writeFileP(path.join(folderPath, name + '.md'), report)
}

module.exports = writeInstructorReport
