const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash',
        moment: 'moment'
      })
    ]
  },
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api/': {
        target: 'http://localhost:8090'
      }
    },
    port: 8080
  }
}
