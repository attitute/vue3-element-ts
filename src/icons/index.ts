import { App } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

// 使用require.context 加载目录下所有的icon
const req = require.context('./svg', false, /\.svg$/)
// 导入./svg下所有.svg文件
const requireAll = (requireContext: ReturnType<typeof require.context>) => requireContext.keys().map(requireContext)

requireAll(req)

export default (app: App) => {
  // 注册icon组件
  app.component('svg-icon', SvgIcon)
}

// require.context 返回指定目录下匹配的所有文件的执行上下文环境
// req变量的keys方法返回modules文件夹下的所有的文件名组成的数组
// 运行每一个文件名组成的数组传入req方法会返回一个modules模块  相当于所有文件都引入了 不需要单个引入
