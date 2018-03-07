export function getCoordinates(values, x0, y0, width, height) {
  var min = Math.floor(Math.min.apply(null, values) * 0.95)
  var max = Math.ceil(Math.max.apply(null, values) * 1.05)

  var yRatio = (max - min) / height
  var xRatio = width / (values.length - 1)

  return values.map(function (value, i) {
    var y = y0 + height - (value - min) / yRatio
    var x = x0 + xRatio * i
    return [x, y]
  })
}
