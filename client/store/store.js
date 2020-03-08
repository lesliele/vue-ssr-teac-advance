import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'
// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     updateCount (state, num) {
//       state.count = num;
//     }
//   }
// })
// 服务端渲染需要生成新的store
export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 严格遵守规则,只有开发环境才会启用
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      a: {
        namespaced: true,
        state: {
          text: 'this is belong a moduels',
          trueName: 'dk',
          falseName: 'big dick'
        },
        mutations: {
          // 默认情况下这里的方法成为全局的mutations，而不是模块下的mutaions
          updateText (state, text) {
            console.log('a.state')
            console.log(state)
            state.text = text
          }
        },
        getters: {
          chinaName (state, getters, rootState) {
            console.log('a.state2')
            console.log(state)
            console.log('全局的state')
            console.log(rootState)
            return `${state.trueName} has ${rootState.count} ${state.falseName}`
          }
        },
        actions: {
          add ({ state, commit, rootState }, data) {
            console.log(state)
            console.log(commit) // 子模块的commit方法
            console.log(rootState)
            console.log(data)
            // commit('updateText', data.number);
            commit('updateCount', { num: data.number }, { root: true });
          }
        }
      },
      b: {
        state: {
          text: 'this is belong b modules'
        }
      }
    }
  })
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default;
      const newMutations = require('./mutations/mutations').default;
      const newGetters = require('./getters/getters').default;
      const newActions = require('./actions/actions').default;

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      });
    })
  }
  return store;
}
