<template>
  <component :is="type" v-bind="linkProps">
    <slot />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  name: 'SidebarItemLink',
  props: {
    to: {
      type: String,
      require: true
    }
  },
  setup(props) {
    // 是不是外链
    const isExt = computed(() => isExternal(props.to || ''))
    // 标签类型
    const type = computed(() => {
      if (isExt.value) return 'a'
      return 'router-link'
    })

    // 标签信息完善
    const linkProps = computed(() => {
      if (isExt.value) {
        return {
          href: props.to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: props.to
      }
    })

    return {
      type,
      linkProps
    }
  }
})
</script>
