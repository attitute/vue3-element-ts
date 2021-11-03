import { GetterTree } from 'vuex'
import { IRootState } from './index'
// 如果写在module内 用module内的state类型 不是module内IRootState
const getters:GetterTree<IRootState, IRootState> = {
  sidebar: (state) => state.app.sidebar
}

export default getters
