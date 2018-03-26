const {resolve} = require('path')
const RE = /`{3,}html\s\(vue\)([^`]+)`{3,}/g

module.exports = function (markdownIt, src) {
  const matchs = []
  let result = src
  let cap = null

  while ((cap = RE.exec(src))) {
    result = result.replace(cap[0], () => {
      const tag = `EDITOR-${matchs.length}`
      const start = src.indexOf(cap[1], 1)

      matchs.push({
        tag,
        start,
        end: cap[1].length + start
      })

      // Add live editor?
      return `<${tag}></${tag}> \n\n${cap[0]}`
    })
  }

  let script = ''

  if (matchs.length) {
    script = `\n<script>
  export default {
    components: {
      ${matchs
    .map(
      m =>
        `'${m.tag}': require('!!vue-loader!${resolve(
          __dirname,
          'part-loader.js'
        )}?start=${m.start}&end=${m.end}!${this.resourcePath}').default`
    )
    .join(',\n')}
    }
  }
  </script>\n`
  }

  return result + script
}
