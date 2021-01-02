const path = require('path')
const webpack = require('webpack')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './admin' : '/',
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
      '/api/admin': {
        target: 'http://175.106.94.17:8080/MGPHR_Service/MGPHR_Service.svc?wsdl'
      }
    },
    port: 8090
  }
}
