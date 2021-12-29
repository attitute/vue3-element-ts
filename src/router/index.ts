import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

// 看作是异步获取路由
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/documentation',
    component: Layout, // 布局组件作为一级路由
    redirect: '/documentation/index',
    name: 'DocumentationLayout',
    children: [
      {
        path: 'index',
        name: 'Documentation',
        component: () => import(/* webpackChunkName: "documentation" */ '@/views/documentation/index.vue'),
        meta: {
          title: 'Documentation',
          icon: 'documentation'
          // noCache: false // 路由是否缓存
        }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    name: 'GuideLayout',
    children: [
      {
        path: 'index',
        name: 'Guide',
        component: () => import(/* webpackChunkName: "guide" */ '@/views/guide/index.vue'),
        meta: {
          title: 'Guide',
          icon: 'guide'
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/menu',
    name: 'SystemLayout',
    meta: {
      title: 'System',
      icon: 'lock',
      alwaysShow: true // 展示
    },
    children: [
      {
        path: 'menu',
        name: 'Menu',
        component: () => import(/* webpackChunkName: "menu" */ '@/views/system/menu.vue'),
        meta: {
          title: 'Menu Management'
        }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import(/* webpackChunkName: "menu" */ '@/views/system/role.vue'),
        meta: {
          title: 'Role Management'
        }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "menu" */ '@/views/system/user.vue'),
        meta: {
          title: 'User Management'
        }
      }
    ]
  },
  { // 外链路由
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://www.baidu.com/',
        redirect: '/',
        meta: {
          title: 'External Link',
          icon: 'link'
        }
      }
    ]
  }
]
/* k可通过设置meta hidden参数来实现路由是否在菜单显示 */
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    // name: 'DashboardLayout',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
          icon: 'el-icon-platform-eleme',
          affix: true // 是不是固定tag
        }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    meta: {
      hidden: true
    },
    name: 'Redirect',
    children: [
      {
        // 带参数的动态路由正则匹配 文档说明
        // https://next.router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#%E5%8F%AF%E9%87%8D%E5%A4%8D%E7%9A%84%E5%8F%82%E6%95%B0
        path: '/redirect/:path(.*)', // 要匹配多级路由 应该加*号
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  }
]

export const routes = [
  ...constantRoutes,
  ...asyncRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
