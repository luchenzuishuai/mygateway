const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  return {
    ...options,
    // webpack/hot/poll?100’表示每100ms检查一次更新。
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      // 导出以'webpack/hot/poll?100'开头的模块不会被外置化处理，即被打包进bundle文件。
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/.js$/, /.d.ts$/],
      }),
      new RunScriptWebpackPlugin({ name: options.output.filename }),
    ],
  };
};
