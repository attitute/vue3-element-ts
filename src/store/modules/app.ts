import { ActionTree, Module, MutationTree } from 'vuex'
import { IRootState } from '../index'
import { Size } from '@/plugins/element'

// 定义app里state类型
export interface IAppState {
  sidebar: {
    opened: boolean,
    num: number
  },
  size: Size
}

// 定义mutations
const mutations: MutationTree<IAppState> = {
  TOGGLE_SIDEBAR(state) {
    state.sidebar.opened = !state.sidebar.opened
  },
  SET_SIZE(state, payload: Size) {
    state.size = payload
  }
}

// 定义actions
const actions: ActionTree<IAppState, IRootState> = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  setSize({ commit }, payload: Size) {
    commit('SET_SIZE', payload)
  }
}

// 定义module
const app: Module<IAppState, IRootState> = {
  namespaced: true,
  state: {
    sidebar: {
      opened: true,
      num: 2
    },
    size: 'medium'
  },
  mutations,
  actions
}

export default app
