const loaderUtils = require('loader-utils')

module.exports = function (src) {
  const {start, end} = loaderUtils.getOptions(this)

  return src.slice(start, end)
}
