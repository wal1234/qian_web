<template>
  <header class="header">
    <div class="header-container">
      <!-- Logo区域 -->
      <div class="logo-container">
        <router-link to="/" class="logo-link">
          <img src="@/assets/images/logo.png" alt="Qian Blog Logo" class="logo-image" />
          <span class="logo-text">Qian Blog</span>
        </router-link>
      </div>
      
      <!-- 导航菜单 - 桌面端和平板端显示 -->
      <nav class="nav-menu" v-show="!isMobile">
        <ul class="nav-list">
          <li class="nav-item" v-for="item in navItems" :key="item.path">
            <router-link 
              :to="item.path" 
              class="nav-link" 
              :class="{ 'is-active': isActiveRoute(item.path) }"
            >
              <el-icon v-if="item.icon" class="nav-icon"><component :is="item.icon" /></el-icon>
              <span>{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
      
      <!-- 搜索框 - 桌面端显示 -->
      <div class="search-container" v-show="isDesktop">
        <el-input
          v-model="searchText"
          placeholder="搜索文章..."
          class="search-input"
          clearable
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWindowSize } from '@vueuse/core'

// 路由相关
const router = useRouter()
const route = useRoute()

// 窗口尺寸
const { width } = useWindowSize()
// 是否为移动端
const isMobile = computed(() => width.value < 768)
// 是否为桌面端
const isDesktop = computed(() => width.value >= 1200)

// 搜索功能
const searchText = ref('')
const handleSearch = () => {
  if (searchText.value.trim()) {
    router.push({
      path: '/articles',
      query: { keyword: searchText.value }
    })
    searchText.value = ''
  }
}

// 导航菜单选项
const navItems = [
  { name: '首页', path: '/', icon: 'House' },
  { name: '文章', path: '/articles', icon: 'Document' },
  { name: '分类', path: '/categories', icon: 'Folder' },
  { name: '标签', path: '/tags', icon: 'Collection' },
  { name: '关于', path: '/about', icon: 'User' }
]

// 判断当前路由是否激活
const isActiveRoute = (path: string): boolean => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 $spacing-base;
  
  .is-desktop & {
    padding: 0;
  }
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: $text-primary;
}

.logo-image {
  height: 32px;
  margin-right: 10px;
  
  .is-mobile & {
    height: 28px;
  }
}

.logo-text {
  font-size: $font-size-large;
  font-weight: bold;
  
  .is-mobile & {
    font-size: $font-size-medium;
  }
}

.nav-menu {
  display: flex;
}

.nav-list {
  display: flex;
  list-style: none;
}

.nav-item {
  margin: 0 $spacing-base;
  
  .is-tablet & {
    margin: 0 $spacing-small;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  color: $text-regular;
  font-size: $font-size-base;
  text-decoration: none;
  padding: $spacing-mini;
  transition: all 0.3s;
  position: relative;
  
  &:hover, &.is-active {
    color: $primary-color;
  }
  
  &.is-active:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: $primary-color;
  }
}

.nav-icon {
  margin-right: 5px;
}

.search-container {
  margin-left: auto;
  width: 200px;
  
  .is-tablet & {
    width: 180px;
  }
}

.search-input {
  :deep(.el-input__wrapper) {
    border-radius: 20px;
  }
}
</style> 