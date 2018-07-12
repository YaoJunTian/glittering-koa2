const postcssPresetEnv =  require('postcss-preset-env');

module.exports = {
    ident: 'postcss',
    plugins: () => [
        postcssPresetEnv({
            stage: 2
          })
        // require('postcss-import')(),
        // require('stylelint')(),
        // require('autoprefixer')(),
        // require('cssnano')()
    ],
    parser: 'sugarss',
    exec: true
}