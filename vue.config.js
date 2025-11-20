const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '^/rest': {
        target: 'https://api.le-systeme-solaire.net',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/rest': '/rest' }
      }
    }
  }
})
