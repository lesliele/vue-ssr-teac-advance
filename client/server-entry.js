import createApp from './create-app';

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();

    router.push(context.url);
    // 异步组件加载后回调,基本只有在服务器采用的
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject(new Error('no components matched'));
      }
      resolve(app)
    })
  })
}
