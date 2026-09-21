const { defineConfig } = require('@vue/cli-service')

const solarApiKey = process.env.VUE_APP_API_KEY_SYS_SOL || process.env.API_KEY_SYS_SOL

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '^/rest': {
        target: 'https://api.le-systeme-solaire.net',
        changeOrigin: true,
        secure: true,
        pathRewrite: { '^/rest': '/rest' },
        headers: solarApiKey
          ? { Authorization: `Bearer ${solarApiKey}` }
          : {}
      }
    }
  }
})
