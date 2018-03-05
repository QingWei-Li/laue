import buble from 'rollup-plugin-buble'

export default {
  input: './src/index.js',
  output: {
    format: 'es',
    file: 'dist/laue.js'
  },
  plugins: [buble()]
}
