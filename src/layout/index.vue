<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <Sidebar />
    </div>
    <div class="main-container">
      <div class="header">
        <div class="navbar">navbar</div>
        <div class="tagsview">tagsview</div>
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
export default {
  components: {
    Sidebar,
    AppMain
  }
}
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
        background: rgb(198, 202, 202);
        .navbar {
          height: 50px;
          background: #727577;
        }
        .tags-view {
          height: 34px;
          background: #3c3d3d;
        }
      }
      .app-main {
        /* 50= navbar  50  如果有tagsview + 34  */
        min-height: calc(100vh - 84px);
        background: rgb(80, 79, 79);
      }
    }
  }

</style>
