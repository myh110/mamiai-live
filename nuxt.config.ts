// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: {
    preset: 'cloudflare-pages',
    compatibilityDate: '2025-01-01',
    minify: true
  },
  vite: {
    define: {
      global: 'globalThis',
      'process.env.NODE_ENV': JSON.stringify('production')
    },
    build: {
      target: 'esnext'
    }
  }
})
