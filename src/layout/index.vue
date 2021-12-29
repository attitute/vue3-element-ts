<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <Sidebar />
    </div>
    <div class="main-container">
      <div class="header">
        <Navbar />
        <TagsView />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
import Navbar from './components/Navbar'
import TagsView from './components/TagsView'
export default defineComponent({
  components: {
    Sidebar,
    AppMain,
    Navbar,
    TagsView
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
        .navbar {
          height: 50px;
        }
        .tags-view {
          height: 34px;
        }
      }
      .app-main {
        /* 50= navbar  50  如果有Tagsview + 34  */
        min-height: calc(100vh - 84px);
      }
    }
  }

</style>
