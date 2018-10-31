import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'

// eslint-disable-next-line
const VERSION = process.env.VERSION
const banner = `/*!
 * Laue v${VERSION}
 * https://laue.js.org
 *
 * Copyright (c) 2018 qingwei-li
 * Licensed under the MIT license
 */\n`
const configs = []

// ES
configs.push({
  input: 'src/index.js',
  output: {
    format: 'es',
    file: 'dist/laue.js',
    banner
  },
  plugins: [buble(), nodeResolve()]
})

// UMD
// eslint-disable-next-line
if (process.env.BUILD === 'production') {
  configs.push({
    input: 'src/umd.js',
    output: {
      format: 'umd',
      name: 'Laue',
      file: 'dist/laue.umd.js',
      sourcemap: true,
      banner
    },
    plugins: [buble(), nodeResolve(), uglify(), filesize()]
  })
}

export default configs
