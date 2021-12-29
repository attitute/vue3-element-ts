import { ActionTree, Module, MutationTree } from 'vuex'
import { IRootState } from '@/store'
import { RouteRecordRaw, RouteRecordNormalized, RouteRecordName } from 'vue-router'

export interface RouteLocationWithFullPath extends RouteRecordNormalized {
  fullPath?: string;
}

export interface ITagsViewState {
  // 存放当前显示的tags view集合
  visitedViews: RouteLocationWithFullPath[],
  // 根据路由name缓存集合
  cachedViews: RouteRecordName[]
}

const mutations:MutationTree<ITagsViewState> = {
  // 添加可显示tags view
  ADD_VISITED_VIEW(state, view) {
    // 过滤去重
    if (state.visitedViews.some(v => v.path === view.path)) return
    // 没有title时处理
    state.visitedViews.push(Object.assign({}, view, {
      title: view.meta.title || 'tag-name'
    }))
  },
  DEL_VISITED_VIEW(state, view) {
    const i = state.visitedViews.indexOf(view)
    i > -1 && state.visitedViews.splice(i, 1)
  },
  // 删除所有的tag views
  DEL_ALL_VISITED_VIEWS(state) {
    state.visitedViews = state.visitedViews.filter(v => v.meta.affix)
  },
  ADD_CACHED_VIEW(state, payload) {
    // 过滤去重
    if (state.cachedViews.includes(payload.name)) return
    if (!payload.meta.noCache) {
      state.cachedViews.push(payload.name)
    }
  },
  // 删除tag缓存
  DEL_CACHED_VIEW(state, payload) {
    const i = state.cachedViews.indexOf(payload.name)
    i > -1 && state.cachedViews.splice(i, 1)
  },
  // 清空缓存列表
  DEL_ALL_CACHED_VIEWS(state) {
    state.cachedViews = state.visitedViews.map(tag => tag.name as string)
  },
  // 删除缓存列表里其他tag 除了当前右键选中的view
  DEL_OTHER_CACHED_VIEWS(state) {
    state.cachedViews = state.visitedViews.map(tag => tag.name as string)
  },
  // 删除标签导航其他可显示tag 除了 affix为true 以及当前右键选中的view
  DEL_OTHER_VISITED_VIEWS(state, payload: RouteRecordRaw) {
    state.visitedViews = state.visitedViews.filter(tag => tag.meta.affix || (tag.path === payload.path))
  }
}
const actions:ActionTree<ITagsViewState, IRootState> = {
  // 添加tags view 和 keepalive缓存
  addView({ dispatch }, payload: RouteRecordRaw) {
    dispatch('addVisitedView', payload)
    dispatch('addCachedView', payload)
  },
  // 删除tags view
  delView({ dispatch }, payload: RouteRecordRaw) {
    return new Promise(resolve => {
      dispatch('delVisitedView', payload)
      dispatch('delCachedView', payload)
      resolve(null)
    })
  },
  // 添加可显示的tags 添加前commit里需要进行去重过滤
  addVisitedView({ commit }, payload: RouteRecordRaw) {
    commit('ADD_VISITED_VIEW', payload)
  },
  // 从可显示的集合中 删除tags
  delVisitedView({ commit }, payload: RouteRecordRaw) {
    commit('DEL_VISITED_VIEW', payload)
  },
  // 清空 可显示列表 和 缓存列表
  delAllViews({ dispatch }) {
    return new Promise(resolve => {
      // 删除显示的路由tag
      dispatch('delAllVisitedViews')
      // 删除缓存的路由
      dispatch('delAllCachedViews')
      resolve(null)
    })
  },
  // 关闭除当前的所有tag 和 缓存列表
  delOtherViews({ dispatch }, payload: RouteLocationWithFullPath) {
    return new Promise(resolve => {
      dispatch('delOtherVisitedViews', payload)
      dispatch('delOtherCachedViews')
      resolve(null)
    })
  },
  // 添加可缓存的标签tag
  addCachedView({ commit }, view: RouteRecordRaw) {
    commit('ADD_CACHED_VIEW', view)
  },
  // 从缓存列表删除指定tag view
  delCachedView({ commit }, payload) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', payload)
      resolve(null)
    })
  },
  // 清空缓存列表
  delAllCachedViews({ commit }) {
    commit('DEL_ALL_CACHED_VIEWS')
  },
  // 删除可显示集合里的所有tag
  delAllVisitedViews({ commit }) {
    commit('DEL_ALL_VISITED_VIEWS')
  },
  // 关闭其他缓存的组件
  delOtherCachedViews({ commit }) {
    commit('DEL_OTHER_CACHED_VIEWS')
  },
  // 关闭其他可显示tag
  delOtherVisitedViews({ commit }, view: RouteRecordRaw) {
    commit('DEL_OTHER_VISITED_VIEWS', view)
  }
}

// 定义module
const tagsView: Module<ITagsViewState, IRootState> = {
  namespaced: true,
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations,
  actions
}

export default tagsView
