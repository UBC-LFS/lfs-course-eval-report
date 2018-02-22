import { writeFile, mkdir, stat } from 'fs'
import { promisify } from 'util'
import path from 'path'
import createTemplate from './report-template'

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

export default writeReport
