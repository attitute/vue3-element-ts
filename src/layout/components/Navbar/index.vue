<template>
  <div class="navbar">
    <Hambuger @toggleClick="toggleSidebar" :isActive="sidebar.opened"/>
    <Breadcrumb/>
    <div class="right-menu">
      <Screenfull  id="screefull" class="right-menu-item hover-effect"/>
      <!-- element组件size切换 -->
      <el-tooltip content="Global Size" effect="dark" placement="bottom">
        <size-select class="right-menu-item hover-effect" />
      </el-tooltip>
      <Avatar></Avatar>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hambuger from '@/components/Hambuger/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
import SizeSelect from '@/components/SizeSelect/index.vue'
import Avatar from '@/components/Avatar/index.vue'
import { useStore } from '@/store/index'

export default defineComponent({
  name: 'Navbar',
  components: {
    Breadcrumb,
    Hambuger,
    Screenfull,
    SizeSelect,
    Avatar
  },
  setup() {
    const store = useStore()
    const toggleSidebar = () => {
      console.log('click')
      store.dispatch('app/toggleSidebar')
    }

    console.log('opened', useStore)
    // 从getters中获取sidebar
    const sidebar = computed(() => store.getters.sidebar)
    return {
      toggleSidebar,
      sidebar
    }
  }
})
</script>

<style lang="scss">
  .navbar {
    display: flex;
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 21, 41, .08);
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    .right-menu {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 15px;
      &-item {
        padding: 0 8px;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;
        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025);
          }
        }
      }
    }
  }
</style>
