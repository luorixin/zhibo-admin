module.exports = {
  publicPath: './',
  productionSourceMap: false,
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/proxyApi': {
        target: 'http://127.0.0.1:9100',
        changeOrigin: true,
        pathRewrite: {
          '^/proxyApi': '/'
        }
      }
    }
  }
}
