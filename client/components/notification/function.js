import Vue from 'vue';
import Component from './func-notification';

const NotificationConstructor = Vue.extend(Component);

const instances = [];
let seed = 1;

const notify = options => {
  if (Vue.prototype.$isServer) return // 服务端渲染

  const {
    autoClose,
    ...rest
  } = options;
  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  });
  const id = `notification_${seed++}`;
  instance.id = id;
  // 如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。
  // 如果没有提供 elementOrSelector 参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。
  const vm = instance.$mount();
  document.body.appendChild(vm.$el);

  let verticalOffset = 0;
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  verticalOffset += 16;
  instance.verticalOffset = verticalOffset;
  instances.push(instance)
  return instance;
}

export default notify;
