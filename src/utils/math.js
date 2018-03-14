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

export function sum(arr) {
  return arr.reduce((a, b) => a + b, 0)
}

export function toArr(o, props) {
  return props.map(prop => o[prop])
}
