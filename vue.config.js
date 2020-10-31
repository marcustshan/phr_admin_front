const path = require('path')
const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash',
        dayjs: 'dayjs'
      })
    ],
    resolve: {
      alias: {
        Api: path.resolve(__dirname, 'src/api/'),
        Components: path.resolve(__dirname, 'src/components/'),
        Views: path.resolve(__dirname, 'src/views/')
      },
      extensions: ['*', '.js', '.vue', '.json']
    }
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
