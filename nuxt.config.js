const headTitle = 'Contents cache demo'
const headDesc = 'API cache on build'

module.exports = {
  srcDir: 'src/',
  plugins: ['~/plugins/infinite-loading.js'],
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    '~/modules/contents',
    ['nuxt-sass-resources-loader', ['~/assets/css/_vars.scss']]
  ],
  css: ['~/assets/css/base.scss'],
  /*
  ** Headers of the page
  */
  head: {
    title: headTitle,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: headDesc }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  manifest: {
    name: headTitle,
    short_name: 'cachedemo',
    description: headDesc,
    lang: 'ja'
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
