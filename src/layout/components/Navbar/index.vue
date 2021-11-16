<template>
  <div class="navbar">
    <Hambuger @toggleClick="toggleSidebar" :isActive="sidebar.opened"/>
    <Breadcrumb/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hambuger from '@/components/Hambuger/index.vue'
import { useStore } from '@/store/index'

export default defineComponent({
  name: 'Navbar',
  components: {
    Breadcrumb,
    Hambuger
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
