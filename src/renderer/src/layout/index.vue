<template>
  <div>
    <el-container class="common-layout">
      <el-menu
        :collapse="isCollapse"
        class="el-menu-vertical-demo"
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        default-active="replaceText"
      >
        <el-menu-item @click="isCollapse = !isCollapse">
          <el-icon class="icon-box">
            <img src="../assets/icon.png" alt="icon" class="icon" />
          </el-icon>
          <template #title><span class="app-name">Rename</span></template>
        </el-menu-item>
        <el-menu-item
          v-for="item in menu"
          :key="item.path"
          @click="navigationMethod(item)"
          :index="item.name"
        >
          <el-icon>
            <component :is="icons[item.meta?.icon as string]" />
          </el-icon>
          <template #title>{{ item.meta?.title }}</template>
        </el-menu-item>
      </el-menu>
      <el-main class="main-box">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Orange, Burger, Grape, Cherry } from '@element-plus/icons-vue'
import type { IMenu } from '@renderer/types/layout'

const router = useRouter()
// 菜单
const menu = ref<IMenu[]>([])
// 菜单折叠
const isCollapse = ref(true)

// 获取菜单
const getMenuByRouter = () => {
  menu.value = router.getRoutes().filter((item) => item.name === 'layout')[0].children as IMenu[]
  console.log(menu.value)
}

// 导航
const navigationMethod = (item: IMenu) => {
  router.push({ name: item.name })
}

// 注册图标组件
const icons = {
  Orange,
  Burger,
  Grape,
  Cherry
}

onMounted(() => {
  getMenuByRouter()
})
</script>

<style scoped lang="less">
.common-layout {
  width: 100%;
  min-height: 100vh;

  .icon-box {
    margin-right: 20px;

    .icon {
      width: 40px;
    }
  }

  .app-name {
    font-size: 20px;
    color: #000;
    font-weight: 700;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
