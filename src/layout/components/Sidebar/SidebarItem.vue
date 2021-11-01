<template>
  <div class="sidebar-item-container"
    v-if="!item.meta || !item.meta.hidden">
    <!-- 只渲染一个路由 -->
      <template v-if="isRenderSingleRoute && theOnlyOneChildRoute">
        <sidebar-item-link
        v-if="theOnlyOneChildRoute.meta"
        :to="resolvePath(theOnlyOneChildRoute.path)">
          <el-menu-item :index="resolvePath(theOnlyOneChildRoute.path)">
            <i v-if="icon && icon.includes('el-icon')" :class="icon"></i>
            <svg-icon
              v-else-if="icon"
              class="menu-icon"
              :icon-class="icon"
            ></svg-icon>
            <template #title>
              <span>{{ theOnlyOneChildRoute.meta.title }}</span>
            </template>
          </el-menu-item>
        </sidebar-item-link>
      </template>
    <!-- 多个子路由时 -->
    <el-submenu
      v-else
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template #title>
        <i
          v-if="item.meta && item.meta.icon.includes('el-icon')"
          :class="icon"
        ></i>
        <svg-icon
          v-else-if="item.meta && item.meta.icon"
          class="menu-icon"
          :icon-class="item.meta.icon"
        ></svg-icon>
        <span class="submenu-title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      >
      </sidebar-item>
    </el-submenu>
  </div>
</template>
<script lang="ts">
import path from 'path'
import { defineComponent, PropType, computed, toRefs } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { isExternal } from '@/utils/validate'
import SidebarItemLink from './SidebarItemLink.vue'

export default defineComponent({
  name: 'SidebarItem',
  components: {
    SidebarItemLink
  },
  props: {
    item: { // 当前路由（此时的父路由）
      type: Object as PropType<RouteRecordRaw>,
      required: true
    },
    basePath: { // 父路由路径（子路由路径如果是相对的 要基于父路径）
      type: String,
      required: true
    }
  },
  setup(props) {
    console.log('props', props.item)
    const { item } = toRefs(props) // torefs 响应式后 取值需.value
    // 子路由数量
    const showingChildNumber = computed(() => {
      const children = (props.item.children || []).filter((child) => {
        // 过滤掉不显示的菜单
        if (child.meta && child.meta.hidden) return false
        return true
      })
      return children.length
    })

    // 设置 alwaysShow: true，这样它就会忽略上面定义的规则，一直显示根路由 哪怕只有一个子路由也会显示为嵌套的路由菜单
    const alwaysShowRootMenu = computed(
      () => props.item.meta && props.item.meta.alwaysShow
    )

    // 要渲染的单个路由 如果该路由只有一个子路由 默认直接渲染这个子路由
    const theOnlyOneChildRoute = computed(() => {
      // 子路由大于1 不是单个渲染路由
      if (showingChildNumber.value > 1) {
        return null
      }

      // if (alwaysShowRootMenu.value) return null
      // 只有一个子路由并且不需要暂时根路由时 直接用当前父路由的子路由进行渲染
      if (item.value.children) {
        for (const child of item.value.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }

      // showingChildNumber === 0 无可渲染的子路由 （可能有子路由 hidden属性为true）
      // 无可渲染chiildren时 把当前路由item作为仅有的子路由渲染
      return {
        ...props.item,
        path: '' // resolvePath避免resolve拼接时 拼接重复
      }
    })

    // menu icon
    const icon = computed(() => {
      // 子路由没有icon 就用父路由的
      return (theOnlyOneChildRoute.value?.meta?.icon || (props.item.meta && props.item.meta.icon)) as string
    })

    // 利用path.resolve 根据父路径+子路径 解析成正确路径 子路径可能是相对的
    const resolvePath = (childPath: string) => {
      if (isExternal(childPath)) {
        return childPath
      }
      return path.resolve(props.basePath, childPath)
    }

    // 是否有可渲染子路由
    const noShowingChildren = computed(() => showingChildNumber.value === 0)

    // 是否只有一条可渲染路由
    const isRenderSingleRoute = computed(() => !alwaysShowRootMenu.value && (!theOnlyOneChildRoute.value?.children || noShowingChildren.value))

    return {
      theOnlyOneChildRoute,
      isRenderSingleRoute,
      icon,
      resolvePath
    }
  }
})
</script>

<style lang="scss">
.sidebar-item-container {
  .menu-icon { // icon样式调整
    margin-right: 16px;
    margin-left: 5px;
    vertical-align: middle;
  }
}
</style>
