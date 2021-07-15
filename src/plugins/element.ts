import { ElButton, locale } from 'element-plus'
// element-plus默认是英文
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css'
import { App } from 'vue'
// Element Plus 直接使用了 Day.js 项目的时间日期国际化设置, 并且会自动全局设置已经导入的 Day.js 国际化配置。
import 'dayjs/locale/zh-cn'

export default (app:App): void => {
  locale(lang) // 语言

  const components = [
    ElButton
  ]

  // vue挂载全局
  components.forEach(component => {
    app.component(component.name, component)
  })

  // 全局配置 文档说明 https://element-plus.gitee.io/#/zh-CN/component/quickstart#quan-ju-pei-zhi
  // 该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸 small，zIndex 设置弹框的初始 z-index（默认值：2000）。
  app.config.globalProperties.$ELEMENT = {
    size: 'medium'
  }
}
