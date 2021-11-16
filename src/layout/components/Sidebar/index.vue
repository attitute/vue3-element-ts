<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-container-menu"
      mode="vertical"
      :default-active="activeMenu"
      :background-color="scssVariables.menuBg"
      :text-color="scssVariables.menuText"
      :active-text-color="scssVariables.menuActiveText"
      :collapse="isCollapse"
      :collapse-transition="true"
    >
      <sidebar-item
        v-for="route in menuRoutes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>

  </div>
</template>
<script lang="ts">
import variables from '@/styles/variables.scss'
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { routes } from '@/router'
import SidebarItem from './SidebarItem.vue'
import { useStore } from '@/store'
export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  setup() {
    const route = useRoute() // 相当于this.$route
    const store = useStore()
    console.log('store:', useStore)
    // 根据路由路径 对应 当前激活的菜单 页面刷新后 激活当前路由匹配的菜单
    const activeMenu = computed(() => {
      const { path, meta } = route
      // 如果有指定的激活菜单
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    // 导入全局样式 scss变量
    const scssVariables = computed(() => variables)
    // 响应式
    const isCollapse = computed(() => !store.getters.sidebar.opened)
    // 路由
    const menuRoutes = computed(() => routes)
    return {
      // // 不有toRefs原因 缺点在这里 variables里面变量属性感觉来源不明确 不知道有哪些变量值
      // ...toRefs(variables),
      isCollapse,
      activeMenu,
      scssVariables,
      menuRoutes

    }
  }
})
</script>

<style lang="scss" scoped>
  .app-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    .main-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      .header {
        background: cyan;
        .navbar {
          height: 50px;
          background: #1890ff;
        }
        .tags-view {
          height: 34px;
          background: #12efff;
        }
      }
      .app-main {
        /* 50= navbar  50  如果有tagsview + 34  */
        min-height: calc(100vh - 84px);
        background: red;
      }
    }
  }

</style>
