import { MutationTree, ActionTree, ModuleTree, Module } from 'vuex'
import { IRootState } from '../index'
// 定义app里state的类型
export interface IAppState {
  sidebar:{
    opened: boolean
  }
}

// 定义state
const state: IAppState = {
  sidebar: {
    opened: true
  }
}

// 定义mutations
const mutations: MutationTree<IAppState> = {
  TOGGLE_SIDEBAR(state) {
    state.sidebar.opened = !state.sidebar.opened
  }
}

// 定义actions
const actions: ActionTree<IAppState, IRootState> = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  }
}

const app:Module<IAppState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}
export default app
