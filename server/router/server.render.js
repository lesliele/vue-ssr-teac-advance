const ejs = require('ejs');

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html';

  // 包含一些属性，比如js,css链接，页面title,description等等信息,比如相关的css文件会在需要时进行加载
  const context = { url: ctx.path };

  try {
    const appString = await renderer.renderToString(context);
    // 客户端激活
    const html = ejs.render(template, {
      appString,
      // 页面样式
      style: context.renderStyles(),
      scripts: context.renderScripts()
    });

    ctx.response.body = html;
  } catch (err) {
    console.log('render error' + err)
    throw err;
  }
}
