export function getCoordinates(values, {x0, y0, width, height}) {
  const min = Math.floor(Math.min.apply(null, values) * 0.95)
  const max = Math.ceil(Math.max.apply(null, values) * 1.05)
  const yRatio = (max - min) / height
  const xRatio = width / (values.length - 1)

  return values.map(function (value, i) {
    const y = y0 + height - (value - min) / yRatio
    const x = x0 + xRatio * i
    return [x, y]
  })
}
