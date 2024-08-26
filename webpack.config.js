const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    ...defaultConfig,
    plugins: [
        ...defaultConfig.plugins,
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/blocks/edumed_rankings/assets'),
                    to: path.resolve(__dirname, 'build/blocks/edumed_rankings/assets'),
                },
            ],
        }),
    ],
};
