const path = require("path")
const resolve = (dir) => {
    return path.join(__dirname, dir)
}

module.exports = {
    chainWebpack: config => {
        config.module
            .rule('svg-sprite')
            .test(/\.svg$/)
            .include.add(resolve("src/assets/svg")).end()
            .use('svg-sprite-loader').loader('svg-sprite-loader').options({symbolId: "[name]", extract:false}).end()
            .use('svgo-loader').loader('svgo-loader')
            .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]})).end();

        config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}]);
        config.module.rule('svg').exclude.add(resolve("src/assets/svg"));
    }
}
