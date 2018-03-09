export function isFn(o) {
  return typeof o === 'function'
}

export function extend(to, _from) {
  // eslint-disable-next-line
  for (var key in _from) {
    to[key] = _from[key]
  }

  return to
}
