import {tickStep} from 'd3-array/src/ticks'

export function int(str) {
  return parseInt(str, 10)
}

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

  return ticks
}
