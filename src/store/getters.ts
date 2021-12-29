import { GetterTree } from 'vuex'
import { IRootState } from './index'

// 定义全局getters
const getters: GetterTree<IRootState, IRootState> = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews
}

export default getters
