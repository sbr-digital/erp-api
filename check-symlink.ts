import fs from 'node:fs'
import path from 'node:path'

const linkPath = path.resolve(
  __dirname,
  'node_modules/vitest-environment-prisma',
)
const targetPath = path.resolve(__dirname, './prisma/vitest-environment-prisma')

if (fs.existsSync(linkPath)) {
  const existingTargetPath = fs.readlinkSync(linkPath)
  if (existingTargetPath === targetPath) {
    process.exit(0)
  } else {
    fs.unlinkSync(linkPath)
  }
}

fs.symlinkSync(targetPath, linkPath, 'junction')
