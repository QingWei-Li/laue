const {join, basename} = require('path')
const glob = require('glob')
const pkg = require('./package.json')

module.exports = {
  head: {
    title: 'Laue',
    titleTemplate: '%s - Laue',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description}
    ]
  },
  loading: {
    color: '#3778ff'
  },
  css: [
    'modern-normalize',
    '~/styles/basic.styl',
    'highlight.js/styles/github.css'
  ],
  srcDir: 'website',
  plugins: [
    '~/plugins/laue.js',
    '~/plugins/head.js',
    {src: '~plugins/ga.js', ssr: false}
  ],
  generate: {
    dir: 'website/dist'
  },
  build: {
    extend(config) {
      let lastToc = ''
      config.module.rules.push({
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader'
          },
          {
            loader: 'ware-loader',
            options: {
              raw: true,
              middleware(src) {
                return src.replace(/\[\[toc\]\]/g, lastToc)
              }
            }
          },
          {
            loader: 'vue-markdown-loader/lib/markdown-compiler.js',
            options: {
              raw: true,
              use: [
                [
                  require('markdown-it-toc-and-anchor').default,
                  {
                    tocLastLevel: 2,
                    tocCallback: (tocMarkdown, tocArray, tocHtml) => {
                      lastToc = tocHtml
                    },
                    anchorClassName: 'anchor',
                    anchorLinkBefore: false
                  }
                ]
              ],
              preventExtract: true
            }
          },
          {
            loader: 'ware-loader',
            options: {
              raw: true,
              middleware: require('./build/demo-middleware')
            }
          }
        ]
      })
    },
    watch: [join(__dirname, 'docs/*/*.md')]
  },
  router: {
    extendRoutes(routes, resolve) {
      glob('docs/*/*.md', (err, matchs) => {
        if (err) {
          console.error(err)
          process.exit(1)
        }

        matchs.forEach(file => {
          const path = file
            .replace(/\.md$/, '')
            .replace(/^docs\//, '')
            .replace(/^en\//, '')

          routes.push({
            name: basename(path),
            path: '/' + path,
            component: resolve(__dirname, file)
          })
        })
      })
    }
  }
}
