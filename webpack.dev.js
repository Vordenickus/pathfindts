const path = require("path");
const {merge} = require("webpack-merge");
const common = require("./webpack.config");

module.exports = merge(common, {
	mode: 'development',
	optimization: {
		minimize: false,
	},
	watch: true,
	devServer: {
		historyApiFallback: true,
		static: path.resolve(__dirname,"./dist"),
		open: true,
		compress: true,
		hot: true,
		port: 3010,
	}
})
