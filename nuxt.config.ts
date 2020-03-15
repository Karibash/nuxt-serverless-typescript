import { Configuration as WebpackConfiguration} from 'webpack';
import { Configuration } from '@nuxt/types';
const path = require('path');
require('dotenv').config();

function requireBuildModule(module: string): string {
  return process.env.IS_LOCAL === 'true' ? module : '';
}

const config: Configuration = {
  mode: 'universal',
  env: {
    APP_NAME: process.env.npm_package_name || 'serverless-nuxt',
    APP_DESCRIPTION: process.env.npm_package_description || '',
    AUTHOR_TWITTER: 'https://twitter.com/karibash',
    GITHUB_REPOSITORY: process.env.npm_package_homepage || '',
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/static/favicon.ico' },
      { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' },
    ],
  },
  loading: { color: '#fff' },
  css: [
    '~/assets/css/sanitize.css',
  ],
  plugins: [
    // Doc: https://github.com/vuejs/composition-api
    '~/plugins/composition-api',
  ],
  buildModules: [
    // Doc: https://github.com/nuxt/typescript
    requireBuildModule('@nuxt/typescript-build'),
  ].filter(Boolean),
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://pwa.nuxtjs.org
    '@nuxtjs/pwa',
  ],
  build: {
    extend (config: WebpackConfiguration, ctx: any) {
    },
  },
  render: {
    etag: false,
  },
  /*
  ** TypeScript module configuration
  ** See https://typescript.nuxtjs.org/ja/guide/setup.html
   */
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true,
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** PWA module configuration
  ** See https://pwa.nuxtjs.org/setup.html
   */
  pwa: {
    workbox: {
      swDest: path.resolve(__dirname, '.serverless_nuxt/static/sw.js'),
    },
  },
};
// export default config;
module.exports = config;
