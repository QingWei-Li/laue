const {join} = require('path')
const glob = require('glob')

module.exports = {
  head: {
    titleTemplate: '%s - Laue',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Meta description'}
    ]
  },
  srcDir: 'website',
  plugins: ['~/plugins/laue.js'],
  build: {
    extend(config) {
      config.module.rules.push({
        test: /\.md$/,
        use: ['vue-markdown-loader']
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
            name: path.replace(/\//g, '-'),
            path: '/' + path,
            component: resolve(__dirname, file)
          })
        })
      })
    }
  }
}
