const {join, basename} = require('path')
const glob = require('glob')
const pkg = require('./package.json')
const demoMiddleware = require('./build/demo-middleware')

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
  css: ['modern-normalize', '~/styles/basic.css'],
  srcDir: 'website',
  plugins: ['~/plugins/laue.js', '~/plugins/head.js', '~/plugins/editor.js'],
  generate: {
    dir: 'website/dist'
  },
  build: {
    extend(config) {
      config.module.rules.push({
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: {
          use: [
            [
              require('markdown-it-anchor'),
              {
                permalink: true,
                permalinkSymbol: '#',
                permalinkClass: 'anchor'
              }
            ]
          ],
          preventExtract: true,
          preprocess: demoMiddleware
        }
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
