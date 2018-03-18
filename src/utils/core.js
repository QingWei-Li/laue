export function isFn(o) {
  return typeof o === 'function'
}

export function isArr(o) {
  return Array.isArray(o)
}

export function isNil(o) {
  return o === null || o === undefined
}

export function isNum(n) {
  return !isNaN(n)
}

export function extend(to, _from) {
  // eslint-disable-next-line
  for (var key in _from) {
    to[key] = _from[key]
  }

  return to
}

export function noNilInArray(arr) {
  return !arr.some(isNil)
}

export function toArr(o, props) {
  return props.map(prop => (isNil(o[prop]) ? null : o[prop]))
}

export function noop() {}

export function debounce(fn, delay = 20) {
  let id

  return function () {
    clearTimeout(id)
    id = setTimeout(fn, delay, ...arguments)
  }
}
