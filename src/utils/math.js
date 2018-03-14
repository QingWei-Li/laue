import {tickStep} from 'd3-array/src/ticks'

export function int(str) {
  return parseInt(str, 10)
}

/**
 * Returns nick ticks
 */
export function genTicks(min, max, count) {
  if (max < min) {
    [min, max] = [max, min]
  }

  const step = tickStep(min, max, count)
  const first = Math.floor(min / step) * step
  const ticks = [first]
  let cur = first

  while (cur < max) {
    cur += step
    ticks.push(cur)
  }

  ticks[0] = min
  ticks[ticks.length - 1] = max

  return ticks
}

/**
 * Returns max or min value from object array
 * @param {Array} data
 * @param {String} type max or min
 * @param {Array} props data props
 */
export function maxOrMin(data, type, props) {
  return Math[type].apply(
    null,
    data.map(o => Math[type].apply(null, props.map(prop => o[prop])))
  )
}
