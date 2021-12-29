import { App } from 'vue'
import {
  ElButton,
  locale,
  ElMenu,
  ElMessage,
  ElNotification,
  ElMessageBox,
  ElMenuItem,
  ElSubmenu,
  ElMenuItemGroup,
  ElCol,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElTooltip,
  ElScrollbar

} from 'element-plus'
// element-plus默认是英文
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css'
// Element Plus 直接使用了 Day.js 项目的时间日期国际化设置, 并且会自动全局设置已经导入的 Day.js 国际化配置。
import 'dayjs/locale/zh-cn'

// $ELEMENT size属性类型
export type Size = 'default' | 'medium' | 'small' | 'mini'

interface ElementOptions {
  size: Size
}

export default (app:App, options: ElementOptions): void => {
  locale(lang) // 语言

  const components = [
    ElButton,
    ElMessage,
    ElNotification,
    ElMessageBox,
    ElMenu,
    ElMenuItem,
    ElSubmenu,
    ElMenuItemGroup,
    ElCol,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElTooltip,
    ElScrollbar
  ]

  // vue挂载全局
  components.forEach(component => {
    app.component(component.name, component)
  })

  app.config.globalProperties.$message = ElMessage
  app.config.globalProperties.$notify = ElNotification
  app.config.globalProperties.$confirm = ElMessageBox.confirm
  app.config.globalProperties.$alert = ElMessageBox.alert
  app.config.globalProperties.$prompt = ElMessageBox.prompt

  app.config.globalProperties.$ELEMENT = {
    size: options.size
  }
}
