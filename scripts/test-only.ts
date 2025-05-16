import { spawn } from 'node:child_process'

const testFilePath = process.argv[2]

if (!testFilePath) {
  console.error('Por favor, forneça o caminho do arquivo de teste.')
  process.exit(1)
}

const command = `npx vitest --watch ${testFilePath}`

const [cmd, ...args] = command.split(' ')

const child = spawn(cmd, args, {
  stdio: 'inherit',
  shell: true,
})

child.on('close', (code) => {
  console.log(`Vitest processo finalizado com código ${code}`)
})
