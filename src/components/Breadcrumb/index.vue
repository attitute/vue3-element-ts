<template>
  <el-breadcrumb class="app-breadcrumb breadcrumb-container" separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in levelList"
      :key="item.path"
    >
      <!-- 面包屑导航最后一个是不可点击的 因为最后一个正是当前所显示的路由 -->
      <span
          v-if="index == levelList.length - 1"
          class="no-redirect"
        >
          {{ item.meta.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch } from 'vue'
import { useRoute, useRouter, RouteLocationMatched, RouteLocationRaw } from 'vue-router'
import { compile } from 'path-to-regexp'
type PartialRouteLocationMatched = Partial<RouteLocationMatched>

export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const levelList = ref<Array<PartialRouteLocationMatched>>([]) // 导航列表 存放matched里筛选的路由记录

    const isDashboard = (route?: PartialRouteLocationMatched) => {
      const name = route && route.name
      if (!name) {
        return false
      }
      return (name as string).trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    }

    const getBreadCrumb = () => {
      // 只存有title的
      const matched = route.matched.filter(item => item.meta && item.meta.title) as PartialRouteLocationMatched[]

      // const first = matched[0]

      // if (!isDashboard(first)) {
      //   matched = ([{
      //     path: '/dashboard',
      //     meta: {
      //       title: 'Dashboard'
      //     }
      //   }]as PartialRouteLocationMatched[]).concat(matched)
      // }

      // route.meta.breadcrumb自定义属性 如果为false 匹配到时 将不会再面包屑导航显示该路由
      levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }

    onBeforeMount(() => {
      getBreadCrumb()
    })

    watch(() => route.path, () => {
      getBreadCrumb()
    })

    // 动态路由处理 动态路由参数填充
    const pathCompile = (path: string) => {
      const toPath = compile(path) // 比如 path /user/:id
      const params = route.params // { id: 10 }
      return toPath(params)
    }

    // 事件
    const handleLink = (route: RouteLocationMatched) => {
      const { path, redirect } = route
      // 重定向路由就走重定向路由
      if (redirect) {
        router.push(redirect as RouteLocationRaw)
      }
      router.push(pathCompile(path))
    }

    return {
      levelList,
      handleLink
    }
  }
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  /* float: left; */
  line-height: 50px;
  font-size: 14px;
  margin-left: 8px;
}

.no-redirect {
  color: #97a8be;
  cursor: text;
}
</style>

<style lang="scss">

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}

.breadcrumb-move {
  transition: all .5s;
}
</style>
