import Vue from 'vue';
import Component from './func-notification';

const NotificationConstructor = Vue.extend(Component);

const instances = [];
let seed = 1;

const removeItem = instance => {
  if (!instance) return;

  const len = instances.length;
  const index = instances.findIndex(inst => instance.id === inst.id);
  instances.splice(index, 1);

  if (len <= 1) return;
  const height = instance.height;
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset =
    parseInt(instances[i].verticalOffset - height - 16)
  }
}

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
  // 触发ater-enter要注意，必须v-show状态发生变化
  instance.isVisible = true;

  let verticalOffset = 0;
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  verticalOffset += 16;
  instance.verticalOffset = verticalOffset;
  instances.push(instance)

  instance.$on('closed', () => {
    removeItem(instance);
    document.body.removeChild(instance.$el); // 删除DOM节点
    instance.$destroy(); // 删除对应的事件
  });
  instance.$on('close', () => {
    instance.isVisible = false;
  })
  return instance;
}

export default notify;
