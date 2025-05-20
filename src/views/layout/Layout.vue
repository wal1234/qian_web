<template>
  <div class="layout-container">
    <!-- 顶部导航栏 -->
    <the-header />
    
    <!-- 主内容区 -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
      </router-view>
    </main>
    
    <!-- 底部版权信息 -->
    <the-footer />
    
    <!-- 返回顶部按钮 -->
    <back-to-top />
    
    <!-- 移动端菜单按钮 -->
    <div class="mobile-menu-btn" v-show="isMobile" @click="toggleMobileMenu">
      <el-icon :size="24" :class="{ 'is-active': mobileMenuVisible }">
        <component :is="mobileMenuVisible ? 'Close' : 'Menu'" />
      </el-icon>
    </div>
    
    <!-- 移动端菜单抽屉 -->
    <el-drawer
      v-model="mobileMenuVisible"
      title="菜单导航"
      direction="ltr"
      size="70%"
      :with-header="false"
      destroy-on-close
    >
      <mobile-menu @select="handleMobileMenuSelect" />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useRoute } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import BackToTop from './components/BackToTop.vue'
import MobileMenu from './components/MobileMenu.vue'

// 获取当前路由
const route = useRoute()

// 窗口尺寸
const { width } = useWindowSize()
// 是否为移动端
const isMobile = computed(() => width.value < 768)

// 移动端菜单状态
const mobileMenuVisible = ref(false)

// 切换移动端菜单
const toggleMobileMenu = () => {
  mobileMenuVisible.value = !mobileMenuVisible.value
}

// 移动端菜单选择处理
const handleMobileMenuSelect = () => {
  mobileMenuVisible.value = false
}

// 监听路由变化，关闭移动端菜单
watch(() => route.path, () => {
  mobileMenuVisible.value = false
})
</script>

<style lang="scss" scoped>
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.main-content {
  flex: 1;
  padding: $spacing-base 0;
  
  .is-mobile & {
    padding: $spacing-base $spacing-mini;
  }
  
  .is-tablet & {
    padding: $spacing-base $spacing-base;
  }
  
  .is-desktop & {
    padding: $spacing-large 0;
  }
}

.mobile-menu-btn {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: $primary-color;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  z-index: 999;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
  
  .el-icon {
    transition: all 0.3s;
    
    &.is-active {
      transform: rotate(90deg);
    }
  }
}
</style> 