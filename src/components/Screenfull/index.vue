<template>
  <div>
    <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="handleClick"></svg-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance, onMounted } from 'vue'
import screenfull, { Screenfull } from 'screenfull'
// isEnabled 是否有全屏模式
// toggle 全屏 切换
//

export default defineComponent({
  name: 'ScreenFull',
  setup() {
    const isFullscreen = ref(false)
    const { proxy } = getCurrentInstance()!
    const handleClick = () => {
      if (screenfull.isEnabled) {
        screenfull.toggle()
        return
      }
      return proxy?.$message({
        message: 'you browser can not work',
        type: 'warning'
      })
    }

    const change = () => {
    // 更新当前全屏状态 根据状态切换对应图标
      isFullscreen.value = (screenfull as Screenfull).isFullscreen
    }

    const init = () => {
      if (screenfull.isEnabled) {
        // 监听全屏切换状态
        screenfull.on('change', change)
      }
    }
    onMounted(() => {
      init()
    })
    return {
      isFullscreen,
      handleClick
    }
  }
})
</script>
