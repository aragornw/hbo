'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
// const JavaScriptObfuscator = require('webpack-obfuscator')
function resolve(dir) {
  return path.join(__dirname, dir)
}
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const productionGzipExtensions = ['js', 'css']

const name = defaultSettings.title // page title
const port = process.env.port || process.env.npm_config_port || 8080 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/managerapi/ascmserver/v2': {
        // target: 'http://10.135.21.231:5000',//测试 .net
        // target: 'http://10.120.149.144:5000',//蔚山生产 .net
        // target: 'http://10.124.56.226:5000',//蔚山测试 .net
        // target: 'http://192.168.13.58:5000',//盐城测试 .net
        target: 'http://10.135.18.61:5000',//盐城uat .net
        // target: 'http://10.135.18.37:5000',//盐城生产 .net
        // target: 'http://10.135.33.7:5000',//奔腾生产 .net
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/managerapi/ascmserver/v2': '/ascmserver/v2'
        }
      },
      //  /managerapi/ascmserver/v1/system/ascm-command-data
      //  /managerapi/v1/system/ascm-command-data
      '/managerapi/ascmserver/v1': {
        target: 'http://10.135.20.20:8080',//测试 java
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/managerapi/ascmserver/v1': '/managerapi/v1'
        }
      },
      '/managerapi': {
        // target: 'http://192.168.2.129:9527',//叶
        // target: 'http://10.135.20.20:8080',//测试
        // target: 'http://192.168.13.58:8080',//盐城测试
        target: 'http://10.135.18.61',//盐城uat
        // target: 'http://hzmes.tpddns.cn:3344',//otd 测试
        // target: 'http://10.61.201.200',//光束测试
        // target: 'http://10.124.56.226',//蔚山测试
        // target: 'http://10.135.18.37:80',//盐城生产
        // target: 'http://10.135.18.40',//盐城生产
        // target: 'http://10.120.149.185',//生产
        // target: 'http://10.135.33.7:9527',//生产
        secure: false,
        changeOrigin: true,
        timeout: 10*60*1000,
        pathRewrite: {
          '^/managerapi': '/managerapi'
        }
      },
      '/plcmanager': {
        // target: 'http://192.168.2.129:9527',//叶
        // target: 'http://10.135.20.20:8080',//测试
        // target: 'http://192.168.13.58:8080',//盐城测试
        target: 'http://10.135.18.31:80',//盐城生产
        // target: 'http://10.120.149.185',//生产
        // target: 'http://10.135.33.7:9527',//生产
        secure: false,
        changeOrigin: true
      },
      '/api': {
        target: 'http://10.135.253.45:9527',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/file_system': {
        target: 'http://10.135.18.61',
        secure: false,
        changeOrigin: true,
      },
      // '/qq': {
      //   target: 'http://10.135.33.26',
      //   secure: false,
      //   changeOrigin: true,
      // },
    },
  },
  configureWebpack: (config) =>{
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.name=name
    config.resolve = {
      ...config.resolve,
      alias: {
        "@": resolve("src"),
      }
    }
    config.module.unknownContextCritical=false
    config.module.exprContextCritical=false
    if (process.env.NODE_ENV == 'production') {
      // 为生产环境修改配置
      config.mode = 'production'
      // 将每个依赖包打包成单独的js文件
      let optimization = {
        minimizer: [new UglifyPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log']
            }
          },
          sourceMap: false,   // 去除打包后生成的.map文件
          parallel: true,
        })]
      }
      Object.assign(config, {
        optimization
      })
    } else {
      // 为开发环境修改配置
      config.mode = 'development'
    }

    if (process.env.NODE_ENV === 'production') {
      // 启用Webpack Obfuscator插件进行代码加密
      config.plugins.push(
          new JavaScriptObfuscator({
            rotateUnicodeArray: true, // 打乱Unicode数组顺序
          })
      );
    }
  },
  chainWebpack(config) {
    config.externals({ './cptable': 'var cptable' })
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    config.module.rule('md')
        .test(/\.md/)
        .use('vue-loader')
        .loader('vue-loader')
        .end()
        .use('vue-markdown-loader')
        .loader('vue-markdown-loader/lib/markdown-compiler')
        .options({
          raw: true
        })
    // set svg-sprite-loader
    config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end()
    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()

    // set preserveWhitespace
    config.module
        .rule('vue')
        .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          options.compilerOptions.preserveWhitespace = true
          return options
        })
        .end()

    config
        // https://webpack.js.org/configuration/devtool/#development
        .when(process.env.NODE_ENV === 'development',
            config => config.devtool('cheap-source-map')
        )

    config
        .when(process.env.NODE_ENV !== 'development',
            config => {
              config
                  .plugin('ScriptExtHtmlWebpackPlugin')
                  .after('html')
                  .use('script-ext-html-webpack-plugin', [{
                    // `runtime` must same as runtimeChunk name. default is `runtime`
                    inline: /runtime\..*\.js$/
                  }])
                  .end()
              config
                  .optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                  libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial' // only package third parties that are initially dependent
                  },
                  elementUI: {
                    name: 'chunk-elementUI', // split elementUI into a single package
                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                  },
                  commons: {
                    name: 'chunk-commons',
                    test: resolve('src/components'), // can customize your rules
                    minChunks: 3, //  minimum common number
                    priority: 5,
                    reuseExistingChunk: true
                  }
                }
              })
              config.optimization.runtimeChunk('single')
            }
        )
  }
}
