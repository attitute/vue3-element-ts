<template>
  <div>
    <el-dropdown class="avatar-container">
      <div class="avatar-wrapper">
        <img :src="avatar" class="user-avatar">
        <i class="el-icon-caret-bottom" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <router-link to="/" >
            <el-dropdown-item divided>个人设置</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click="loginOut">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import avatar from '@/assets/logo.png'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'avatar',
  setup() {
    const loginOut = () => {
      console.log('退出登录')
    }
    return {
      loginOut,
      avatar
    }
  }
})
</script>
<style lang="scss" scoped>
.avatar-container {
  margin-right: 30px;
  .avatar-wrapper {
    margin-top: 5px;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      cursor: pointer;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      font-size: 12px;
    }
  }
}
</style>
