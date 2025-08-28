const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
	...defaultConfig,
	plugins: [
		...defaultConfig.plugins,
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src/blocks/edumed_rankings/assets"),
					to: path.resolve(__dirname, "build/blocks/edumed_rankings/assets"),
				},
				{
					from: path.resolve(__dirname, "src/blocks/psd_rankings/assets"),
					to: path.resolve(__dirname, "build/blocks/psd_rankings/assets"),
				},
				{
					from: path.resolve(__dirname, "src/blocks/testimonial-card/assets"),
					to: path.resolve(__dirname, "build/blocks/testimonial-card/assets"),
				},
				{
					from: path.resolve(__dirname, "src/blocks/testimonial-card/inc"),
					to: path.resolve(__dirname, "build/blocks/testimonial-card/inc"),
				},
				{
					from: path.resolve(__dirname, "src/blocks/salary_table/inc"),
					to: path.resolve(__dirname, "build/blocks/salary_table/inc"),
				},
				{
					from: path.resolve(__dirname, "src/blocks/salaries_careers/inc"),
					to: path.resolve(__dirname, "build/blocks/salaries_careers/inc"),
				},
				{
					from: path.resolve(__dirname, "src/blocks/edumed_rankings/inc"),
					to: path.resolve(__dirname, "build/blocks/edumed_rankings/inc"),
				},
				{
					from: path.resolve(__dirname, "inc"),
					to: path.resolve(__dirname, "build/inc"),
					noErrorOnMissing: true,
					globOptions: {
						ignore: ["**/.DS_Store"],
					},
					force: true,
				},
			],
		}),
	],
};
