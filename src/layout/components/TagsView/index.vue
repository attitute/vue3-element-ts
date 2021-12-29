<template>
  <div class="tags-view-container">
    <ScrollPanel>
      <div class="tags-view-wrapper">
        <router-link
          v-for="(tag, index) in visitedTags"
          :key="index"
          customs
          v-slot="{ navigate }"
          :to="{path: tag.path, query: tag.query, fullPath: tag.fullPath}"
        >
        <el-dropdown trigger="contextmenu" @command="command => handleTagCommand(command, tag)">
          <div class="tags-view-item"
            :class="{
              active: isActive(tag)
            }">
            <span @click="navigate" role="link">{{ tag.meta.title }}</span>
            <span
              class="el-icon-close"
              v-if="!isAffix(tag)"
              @click.prevent.stop="closeSelectedTag(tag)"
            ></span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="'refresh'">刷新</el-dropdown-item>
              <el-dropdown-item :command="'all'">关闭所有</el-dropdown-item>
              <el-dropdown-item :command="'other'">关闭其它</el-dropdown-item>
              <el-dropdown-item :command="'self'" v-if="!isAffix(tag)">关闭</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        </router-link>
      </div>
    </ScrollPanel>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter, RouteRecordRaw } from 'vue-router'
import { useStore } from '@/store'
import { routes } from '@/router'
import { RouteLocationWithFullPath } from '@/store/modules/tagsView'
import path from 'path'
import ScrollPanel from './ScrollPanel.vue'

// 右键菜单
enum TagCommandType {
  Refresh = 'refresh',
  All = 'all',
  Other = 'other',
  Self = 'self'
}
export default defineComponent({
  name: 'TagsView',
  components: {
    ScrollPanel
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    // 从store里获取 可显示的tags view
    const visitedTags = computed(() => store.state.tagsView.visitedViews)

    // 从路由表中过滤出要affixed tagviews
    const fillterAffixTags = (routes: Array<RouteLocationWithFullPath | RouteRecordRaw>, basePath = '/') => {
      let tags: RouteLocationWithFullPath[] = []
      routes.forEach(route => {
        // 把路由路径解析成完整路径，路由可能是相对路径
        const tagPath = path.resolve(basePath, route.path)
        if (route.meta && route.meta.affix) {
          tags.push({
            name: route.name,
            path: tagPath,
            fullPath: tagPath,
            meta: { ...route.meta }
          } as RouteLocationWithFullPath)
        }
        if (route.children) {
          const childrenTags = fillterAffixTags(route.children, route.path)
          tags = [...tags, ...childrenTags]
        }
      })
      return tags
    }

    // 初始化affix的tag
    const initTags = () => {
      const affixTags = fillterAffixTags(routes)
      for (const tag of affixTags) {
        if (tag.name) {
          store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    }
    // 路径发生变化追加tags
    watch(() => route.path, () => {
      console.log('route', route.path)
      addTags()
    })

    // 当前router到tags view
    onMounted(() => {
      initTags()
      addTags()
    })

    // 添加tags
    const addTags = () => {
      const { name } = route
      if (name) {
        store.dispatch('tagsView/addView', route)
      }
    }

    // 切换到最后一个标签
    const toLastView = (visitedViews:RouteLocationWithFullPath[], view:RouteLocationWithFullPath) => {
      // 得到集合中最后一个项tag view 可能没有
      const lastView = visitedViews[visitedViews.length - 1]
      if (lastView) {
        router.push(lastView.fullPath as string)
      } else {
        // 如果刚刚删除的正是Dashboard 就重定向回Dashboard（首页）
        if (view.name === 'Dashboard') {
          router.replace({ path: '/redirect' + view.fullPath as string })
        } else {
          // tag都没有了 删除的也不是Dashboard 只能跳转首页
          router.push('/')
        }
      }
    }

    // 删除选中的标签
    const closeSelectedTag = (view: RouteLocationWithFullPath) => {
      store.dispatch('tagsView/delView', view).then(() => {
        if (isActive(view)) {
          toLastView(visitedTags.value, view)
        }
      })
    }
    const isActive = (tag: RouteRecordRaw) => {
      return tag.path === route.path
    }

    // 是否是始终固定在tagsview上的tag
    const isAffix = (tag: RouteLocationWithFullPath) => {
      return tag.meta && tag.meta.affix
    }

    // 关闭标签操作
    const handleTagCommand = (command: TagCommandType, tag: RouteLocationWithFullPath) => {
      switch (command) {
        case TagCommandType.All:
        // 关闭除affix的所有标签
          handleCloseAllTag(tag)
          break
        case TagCommandType.Other:
        // 关闭除affix和当前以外所有标签
          handleCloseOtherTag(tag)
          break
        case TagCommandType.Self:
        // 关闭当前标签
          closeSelectedTag(tag)
          break
        case TagCommandType.Refresh:
          // 刷新当前右键选中tag对应的路由
          refreshSelectedTag(tag)
          break
      }
    }

    // 关闭除affix的所有标签
    const handleCloseAllTag = (view: RouteLocationWithFullPath) => {
      store.dispatch('tagsView/delAllViews').then(() => {
        // 关闭所有后 就让切换到剩下affix中最后一个tag
        toLastView(visitedTags.value, view)
      })
    }
    // 关闭除affix和当前以外所有标签
    const handleCloseOtherTag = (view: RouteLocationWithFullPath) => {
      store.dispatch('tagsView/delOtherViews', view).then(() => {
        // 关闭后 切换到最后一个tag
        toLastView(visitedTags.value, view)
      })
    }
    // 刷新当前右键选中tag对应的路由
    const refreshSelectedTag = (view: RouteLocationWithFullPath) => {
      store.dispatch('tagsView/delCachedView', view).then(() => {
        // 清除缓存后 切换到当前的路由
        const { fullPath } = view
        nextTick(() => {
          router.replace('/redirect' + fullPath)
        })
      })
    }
    return {
      visitedTags,
      isActive,
      closeSelectedTag,
      isAffix,
      handleTagCommand
    }
  }
})
</script>

<style lang="scss" scoped>
  .tags-view-container {
    overflow: hidden;
    height: 34px;
    background-color: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 ragb(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    .tags-view-wrapper {
      text-align: left;
      .tags-view-item {
        display: inline-block;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        background: #fff;
        color: #495060;
        padding: 0 8px;
        box-sizing: border-box;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;

        &:first-of-type {
          margin-left: 15px;
        }
        &:last-of-type {
          margin-right: 15px;
        }
        &.active {
          background-color: #42b983;
          color: #fff;
          border-color: #42b983;
          &::before {
            position: relative;
            display: inline-block;
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 5px;
            background: #fff;
          }
        }
      }
    }
  }
</style>
<style lang="scss">
.tags-view-container {
  .el-icon-close {
    width: 16px;
    height: 16px;
    position: relative;
    left: 2px;
    border-radius: 50%;
    text-align: center;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    transform-origin: 100% 50%;
    &:before {
      transform: scale(.6);
      display: inline-block;
      vertical-align: -1px;
    }
    &:hover {
      background-color: #b4bccc;
      color: #fff;
    }
  }
}
</style>
