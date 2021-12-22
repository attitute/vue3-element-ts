<template>
  <div>
    <el-dropdown trigger="click" @command="handleSize">
      <div>
        <svg-icon class-name="size-icon" icon-class="size"></svg-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(item, index) in sizeOptions" :key="index" :command="item.value"
              :disabled="item.value === size"> {{item.label}}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import {
  computed, defineComponent,
  getCurrentInstance,
  ComponentInternalInstance,
  ComponentPublicInstance,
  nextTick,
  ref
} from 'vue'
import { Size } from '@/plugins/element'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
export default defineComponent({
  name: 'SizeSelect',
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    // store获取size
    const size = computed(() => store.getters.size)
    // element buttonsize selection
    const sizeOptions = ref([
      { label: 'Default', value: 'default' },
      { label: 'Medium', value: 'medium' },
      { label: 'Small', value: 'small' },
      { label: 'Mini', value: 'mini' }
    ])

    // 刷新当前路由
    const refreshView = () => {
      const { fullPath } = route
      // 重定向到中间页 实现vue中当前路由刷新
      nextTick(() => {
        router.replace({
          path: '/redirect' + fullPath
        })
      })
    }

    // 修改size值
    const handleSize = (command: Size) => {
      window.console.log('23123123123');
      // 修改element-plus组件尺寸
      (proxy as ComponentPublicInstance).$ELEMENT.size = command
      store.dispatch('app/setSize', command)
      // 切换size需要刷新路由才能生效
      refreshView();
      (proxy as ComponentPublicInstance).$message({
        type: 'success',
        message: 'Switch Size Success'
      })
    }

    return {
      sizeOptions,
      handleSize,
      size
    }
  }
})
</script>
<style lang="scss">
  .size-icon {
    font-size: 18px;
  }
</style>
