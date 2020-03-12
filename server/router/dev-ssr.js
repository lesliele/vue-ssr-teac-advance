const Router = require('koa-router');
const MemoryFs = require('memory-fs');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const VueServerRender = require('vue-server-renderer');
const serverConfig = require('../../build/webpack.config.server');
const serverRender = require('./server.render.js');

const serverCompiler = webpack(serverConfig); // webpack编译
const mfs = new MemoryFs();
serverCompiler.outputFileSystem = mfs; // 写入内存，默认写入磁盘

let bundle;
// webpack 检测到文件变更(非服务器)，就会重新执行编译
// 在Node端直接进行webpack编译，而不是在server文件下手动编译
serverCompiler.watch({}, (err, stats) => {
  // err 对象只会包含 webpack 相关的问题，比如配置错误等。
  // stats 代码编译过程中的错误
  if (err) throw err;
  stats = stats.toJson();
  // if (stats.hasErrors()) stats.errors.forEach(err => console.log(err));
  // if (stats.hasWarnings()) stats.warnings.forEach(warn => console.log(warn));
  stats.errors.forEach(err => console.log(err));
  stats.warnings.forEach(warn => console.log(warn));

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  );

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
  console.log('new Bundle generated')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.response.body = 'wait a miniute';
    return;
  }
  // 由于同时需要开启webpack.clinet进行编译，所以需要请求指定的地址
  const clientManifestResp = await axios.get('http://127.0.0.1:8088/public/vue-ssr-client-manifest.json');
  const clientManifest = clientManifestResp.data;

  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8');

  const renderer = VueServerRender
    .createBundleRenderer(bundle, {
      inject: false, // 默认自动注入相关文件，关闭该选项进行自定义
      clientManifest
    });

  await serverRender(ctx, renderer, template);
}

const router = new Router();
router.get('*', handleSSR);

module.exports = router;
