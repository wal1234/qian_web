<template>
  <transition name="fade">
    <div 
      v-show="isVisible"
      class="back-to-top"
      @click="scrollToTop"
    >
      <el-icon :size="20"><Top /></el-icon>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 控制按钮显示与隐藏
const isVisible = ref(false)

// 滚动检测函数
const handleScroll = () => {
  isVisible.value = window.scrollY > 300
}

// 返回顶部函数
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 监听滚动事件
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// 移除滚动事件监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: $primary-color;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  z-index: 99;
  transition: all 0.3s;
  
  .is-mobile & {
    bottom: 140px;
  }
  
  &:hover {
    background-color: lighten($primary-color, 10%);
    transform: scale(1.1);
  }
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 