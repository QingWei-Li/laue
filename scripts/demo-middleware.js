const {resolve} = require('path')
const {readFileSync} = require('fs')
const RE = /\[\S+\]\((\S+\.vue)\)/g

module.exports = function (src) {
  const matchs = []
  let result = src
  let cap = null

  while ((cap = RE.exec(src))) {
    result = result.replace(cap[0], () => {
      const tag = `DEMO-${matchs.length}`
      const filename = resolve(this.resourcePath, '..', cap[1])
      const content = readFileSync(filename).toString()

      matchs.push({
        tag,
        filename
      })

      // Add live editor?
      return `<div class="demo"><${tag}></${tag}></div>\n\n\`\`\`html\n${content}\n\`\`\``
    })
  }

  let script = ''

  if (matchs.length) {
    script = `components: {
      ${matchs
    .map(m => `'${m.tag}': require('${m.filename}').default`)
    .join(',\n')}
    },`
  }

  script = `\n<script>
  export default {
    ${script}
    inject: ['page'],

    created() {
      this.page.toc = \`[[toc]]\`
    }
  }
  </script>\n`

  return result + script
}
