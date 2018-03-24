const babel = require('@babel/core')
const buble = require('buble')

module.exports = {
  process: src => {
    const {code} = babel.transformSync(src, {
      plugins: ['@babel/plugin-transform-modules-commonjs']
    })

    return buble.transform(code).code
  }
}
