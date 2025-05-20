<template>
  <div class="app-container">
    <!-- 响应式布局容器 -->
    <div class="responsive-container">
      <!-- 根据路由配置显示不同组件 -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useWindowSize } from '@vueuse/core'

// 获取窗口尺寸，用于响应式布局
const { width } = useWindowSize()

// 检测设备类型，添加对应的CSS类
function setDeviceType() {
  const htmlEl = document.documentElement
  
  // 移除所有设备类型
  htmlEl.classList.remove('is-mobile', 'is-tablet', 'is-desktop')
  
  // 根据屏幕宽度添加对应设备类型
  if (width.value < 768) {
    htmlEl.classList.add('is-mobile')
  } else if (width.value >= 768 && width.value < 1200) {
    htmlEl.classList.add('is-tablet')
  } else {
    htmlEl.classList.add('is-desktop')
  }
}

// 组件挂载时，初始化设备类型检测
onMounted(() => {
  setDeviceType()
  window.addEventListener('resize', setDeviceType)
})

// 组件卸载时，移除事件监听
onUnmounted(() => {
  window.removeEventListener('resize', setDeviceType)
})
</script>

<style lang="scss">
.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.responsive-container {
  width: 100%;
  margin: 0 auto;
  flex: 1;
  
  // 响应式宽度调整
  .is-desktop & {
    max-width: 1200px;
  }
  
  .is-tablet & {
    max-width: 960px;
  }
  
  .is-mobile & {
    max-width: 100%;
    padding: 0 15px;
  }
}

// 页面切换过渡效果
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 