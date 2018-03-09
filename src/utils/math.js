export function int(str) {
  return parseInt(str, 10)
}

// From https://github.com/WickyNilliams/pure-color/blob/master/convert/hsv2hsl.js
export function hsv2hsl(h, s, v) {
  let sl
  let l

  l = (2 - s) * v
  sl = s * v
  sl /= l <= 1 ? l : 2 - l
  sl = sl || 0
  l /= 2

  return [h, sl * 100, l * 100]
}

// Based on http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
const goldenRatio = 0.618033988749895
export function randomHSL(hue = Math.random(), s = 0.5, v = 0.95) {
  hue = 1 / hue
  hue += goldenRatio
  hue %= 1

  return hsv2hsl(hue * 360, s, v)
}
