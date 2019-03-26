const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Clean = require('clean-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const comp = path.resolve(__dirname,'../src/logic/component/default');

const entries = fs.readdirSync(comp)
    .filter(entry => entry!=='ASSETS' && fs.statSync(path.join(comp, entry)).isDirectory());

const commonp = path.resolve(__dirname, '../src/logic/common');

const commonEntries = fs.readdirSync(commonp).filter((entry) => entry.indexOf('calcStyle') < 0);

let entry = {}, plugins = [];

// plugins.push(new Clean(['build'],{
//     root: path.resolve(__dirname, '../'),
//     verbose:  true,
//     dry:      false
// }));

// plugins.push(new Copy([{
//     from: path.resolve(__dirname, '../src/logic/component/default/ASSETS') +'/**/*',
//     to: '[1][2]',
//     test: /^.*(ASSETS)(.*)$/
// }]));

entries.forEach((item) => {
    entry[`component/default/${item}/index`] = `${comp}/${item}/index.js`;
});

commonEntries.forEach((item) => {
    entry[`common/${item.replace('.js','')}`] = `${commonp}/${item}`;
});

entry['index'] = path.resolve(__dirname,'../src/logic/index.js');

let config = {
    mode: "production",
    entry: entry,
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    /* resolve: {
        extensions: ['.js','.styl']
    }, */
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'stage-0'],
                    }
                },
                exclude: /node_modules/
            },
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [
                            require.resolve('style-loader'),
                            {
                                loader: require.resolve('css-loader')
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    ident: 'postcss',
                                    plugins: () => [
                                        require('postcss-flexbugs-fixes'),
                                        autoprefixer({
                                            browsers: [
                                                '>1%',
                                                'last 4 versions',
                                                'Firefox ESR',
                                                'not ie < 9', // React doesn't support IE8 anyway
                                            ],
                                            flexbox: 'no-2009',
                                        }),
                                    ],
                                },
                            }
                        ]
                    },
                    {
                        test: /\.styl$/,
                        loaders: ['style-loader', 'css-loader', 'stylus-loader']
                    },
                    {
                        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/,/\.styl$/],
                        loader: require.resolve('file-loader'),
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                ]
            },
        ]
    },
    /*optimization: {
        splitChunks: {
            name: true,
            cacheGroups: {
                common: {
                    name: "common",
                    chunks: "initial",
                    minChunks: 4,
                }
            }
        }
    },*/
    externals: [ nodeExternals() ]
}

module.exports = config;