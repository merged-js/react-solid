import fs from 'fs/promises'

import typescript from '@rollup/plugin-typescript'
import del from 'rollup-plugin-delete'

export default {
  input: 'src/index.ts',
  external: id => !(id.startsWith('.') || id.startsWith('/')),
  output: [
    {
      dir: './dist',
      format: 'es',
      preserveModules: true,
      entryFileNames: 'es/[name].js',
    },
    {
      dir: './dist',
      format: 'cjs',
      preserveModules: true,
      entryFileNames: 'cjs/[name].js',
    },
  ],
  plugins: [
    del({ runOnce: true, targets: ['./dist/**/*'] }),
    typescript(),
    {
      writeBundle() {
        return fs.writeFile('./dist/es/package.json', JSON.stringify({ type: 'module' }, null, '  '))
      },
    },
  ],
}
