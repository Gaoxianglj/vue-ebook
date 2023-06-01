function mock (app, url, data) {
  app.get(url, (req, res) => {
    res.json(data)
  })
}
const homeData = require('./src/mock/bookHome')
const shelfData = require('./src/mock/bookShelf')
const listData = require('./src/mock/bookList')
const flatListData = require('./src/mock/bookFlatList')
module.exports = {
  publicPath: './',

  devServer: {
    before (app) {
      mock(app, '/book/home', homeData)
      mock(app, '/book/shelf', shelfData)
      mock(app, '/book/list', listData)
      mock(app, '/book/flat-list', flatListData)
    },
    proxy: {
      '/api': {
        target: 'http://43.138.15.210:8003/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/localApi': {
        target: 'http://127.0.0.1:9080/',
        changeOrigin: true,
        pathRewrite: {
          '^/localApi': '/'
        }
      }
    }
  }
}
//   configureWebpack: {
//     performance: {
//       hints: 'warning',
//       maxAssetSize: 921600,
//       maxEntrypointSize: 921600
//     }
//   }
// }
// const webpack = require('webpack')
// module.exports = {
//   chainWebpack: config => {
//     config.plugin('provide').use(webpack.ProvidePlugin, [{
//       $: 'jquery',
//       jquery: 'jquery',
//       jQuery: 'jquery',
//       'window.jQuery': 'jquery'
//     }])
//   }
// }
// module.exports = {
//   // 消除net::ERR_CONNECTION_TIMED_OUT错误
//   devServer: {
//     host: '0.0.0.0',
//     port: 8080
//   }
// }
