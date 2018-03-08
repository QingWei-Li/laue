const prefixes = ['', 'ms', 'webkit', 'moz', 'o']

export function getSupportedPropertyName(property) {
  for (let i = 0; i < prefixes.length; i++) {
    const toCheck = prefixes[i] ?
      prefixes[i] + property.charAt(0).toUpperCase() + property.slice(1) :
      property
    if (typeof window.document.body.style[toCheck] !== 'undefined') {
      return toCheck
    }
  }
  return null
}
