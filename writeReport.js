const { promisify } = require('util')
const { writeFile, mkdir, existsSync } = require('fs')
const path = require('path')

const writeFileP = promisify(writeFile)
const mkdirP = promisify(mkdir)

const writeReport = async (puid, report) => {
  if (!existsSync(path.join(__dirname, '/output/', puid))) {
    await mkdirP(path.join(__dirname, '/output/', puid))
  }
  await writeFileP(path.join(__dirname, '/output/', puid, puid + '.md'), report)
}

module.exports = writeReport
