import colors from 'vuetify/es5/util/colors'
import axios from 'axios'
const pkg = require('./package');
var urlApi = pkg.local_web=='local' ? pkg.apiLocal : pkg.apiWeb;

export default {

  target: 'server', /** static  */
  mode: 'universal',

  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white'
  },

  head: {
    titleTemplate: '%s | BSBG1',
    title: (pkg.titlePage || 'BSBG1'),
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description || '' },
      { name: 'author', content: pkg.author },
      { name: 'robots', content: 'index,follow' },
      { property: 'og:locale', content: 'pt_BR' },
      { property: 'og:site_name', content: 'bsbg1' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:site', content: '@bsbg1' },
      { property: 'twitter:creator', content: '@bsbg1' },
      { property: 'og:type', content: 'website' },
      { property: 'article:section', content: 'Facebook' },
      { property: 'fb:app_id', content: '164759580914460' },
      { property: 'article:publisher', content: 'https://www.facebook.com' },
      { property: 'og:image:type', content: 'image/jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
    ],

    link: [
      { hid: 'canonical', href: `${pkg.urlSite}` },

      { rel: 'icon', type: 'image/png', href: '/32.png' },
      { rel: 'icon', type: 'image/png', href: '/32.png' },
      { rel: 'icon', type: 'image/png', sizes:'16x16', href: '/icons/16.png' },
      { rel: 'icon', type: 'image/png', sizes:'32x32', href: '/icons/32.png' },
      { rel: 'icon', type: 'image/png', sizes:'57x57', href: '/icons/57.png' },
      { rel: 'icon', type: 'image/png', sizes:'72x72', href: '/icons/72.png' },
      { rel: 'icon', type: 'image/png', sizes:'114x114', href: '/icons/114.png' },
      { rel: 'icon', type: 'image/png', sizes:'192x192', href: '/icons/192.png' },


      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nova+Square&family=Roboto+Serif:wght@100;200;300;400;500;600;700;800&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' },
      { rel: "stylesheet", href: "/css/bootstrap.css" },
      { rel: "stylesheet", href: "/css/animate.css" },
      { rel: "stylesheet", href: "/css/fontawesome-all.css" },
      { rel: "stylesheet", href: "/css/flaticon.css" },
      { rel: "stylesheet", href: "/css/hover.css" },
      { rel: "stylesheet", href: "/css/custom-animate.css" },
      { rel: "stylesheet", href: "/css/style.css" },
      { rel: "stylesheet", href: "/css/rtl.css" },
      { rel: "stylesheet", href: "/css/responsive.css" },
      { rel: "stylesheet", href: "/css/colors/color-default.css" },
      { rel: "stylesheet", href: "https://cdn.tailwindcss.com" },
    ],
    script: [

    ]
  },
  loading: { color: '#ffa915', height: '4px' },

  // css: [
  //   '@/assets/styles/main.css'
  // ],

  plugins: [
    '~/plugins/axios',
    '~/plugins/auth',
    '~/plugins/mixins/validation',
    '~/plugins/vuelidate',
    '~/plugins/vuemask',
    '~/plugins/vuemoney',
    '~/plugins/TiptapVuetify',
    '~/plugins/convert-date',
    { src: '~/plugins/vue-core-image-upload.js', ssr: false },
    // { src: '~/plugins/vue-core-image-upload.js', ssr: false },
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/google-analytics',
    // '@nuxtjs/google-fonts',
  ],

  googleAnalytics: {
    id: 'UA-56908470-1'
  },

  // googleFonts: {
  //   families: {
  //     Roboto: true,
  //     'Josefin+Sans': true,
  //     Lato: [100, 300],
  //     Raleway: {
  //       wght: [100, 400],
  //       ital: [100]
  //     },
  //   }
  // },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/fontawesome',
    'vue-sweetalert2/nuxt',
    'nuxt-material-design-icons',
    'nuxt-breakpoints',
  ],

  axios: {
    baseURL: `${urlApi}`
  },

  auth: {
    redirect: { login: '/login', logout: '/', callback: '/login', home: '/admin' },
    strategies: {
      local: {
        token: { property: 'token', type: 'Bearer' },
        user: { property: 'user', autoFetch: false },
        endpoints: {
          login: { url: '/auth/signin', method: 'POST' },
          logout: { url: '/auth/logout', method: 'POST' },
          user: { url: '/auth/me', method: 'get' }
        },
      }
    }
  },

  router: {
    middleware: ['clearValidationErrors']
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.purple.darken3,
          accent: colors.grey.darken3,
          secondary: '#ff0000',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: colors.purple.darken3,
          accent: colors.grey.darken3,
          secondary: '#ff0000',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
      }
    }
  },

  build: {
    transpile: ['vuetify/lib', 'tiptap-vuetify'],
    extend(config, ctx) {
    }
  },
  // server: {
  //   port: 3001,
  // }
}
