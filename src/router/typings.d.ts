
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    icon?: string;
    hidden?: boolean;
    // 路由是否缓存 没有这个属性或false都会缓存 true不缓存
    noCache?: boolean;
    activeMenu?: string; // 指定菜单激活
    breadcrumb?: boolean; // 该路由是否显示面包屑
    affix?: boolean; // 固定显示在tagsView中
    alwaysShow?: boolean; // 菜单是否一直显示根路由
  }
}
