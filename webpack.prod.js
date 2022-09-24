const {merge} = require("webpack-merge");
const common = require("./webpack.config");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
	mode: "production",
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin({
				minimizerOptions:{
					preset: [
						"default",
						{
							discardComments: {
								removeAll:true,
							}
						}
					]
				}
			}),
			new TerserPlugin(),
		]
	},
})