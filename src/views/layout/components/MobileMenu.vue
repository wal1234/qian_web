<template>
  <div class="mobile-menu">
    <!-- 顶部用户信息 -->
    <div class="user-info">
      <div class="blog-info">
        <img src="@/assets/images/logo.png" alt="Qian Blog Logo" class="blog-logo" />
        <div class="blog-name">Qian Blog</div>
      </div>
      <div class="blog-desc">记录生活，分享技术</div>
    </div>
    
    <!-- 导航菜单列表 -->
    <ul class="menu-list">
      <li 
        v-for="item in navItems" 
        :key="item.path" 
        class="menu-item"
        :class="{ 'is-active': isActiveRoute(item.path) }"
        @click="handleSelect(item.path)"
      >
        <el-icon class="menu-icon"><component :is="item.icon" /></el-icon>
        <span class="menu-text">{{ item.name }}</span>
      </li>
    </ul>
    
    <!-- 底部搜索框 -->
    <div class="search-box">
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
      <el-button type="primary" class="search-btn" @click="handleSearch">搜索</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// 定义emit事件
const emit = defineEmits(['select'])

// 路由相关
const router = useRouter()
const route = useRoute()

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

// 处理菜单项点击
const handleSelect = (path: string) => {
  router.push(path)
  emit('select')
}

// 搜索功能
const searchText = ref('')
const handleSearch = () => {
  if (searchText.value.trim()) {
    router.push({
      path: '/articles',
      query: { keyword: searchText.value }
    })
    searchText.value = ''
    emit('select')
  }
}
</script>

<style lang="scss" scoped>
.mobile-menu {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: $spacing-base;
}

.user-info {
  padding: $spacing-base;
  margin-bottom: $spacing-base;
  border-bottom: 1px solid $border-color-lighter;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.blog-info {
  display: flex;
  align-items: center;
  margin-bottom: $spacing-small;
}

.blog-logo {
  width: 40px;
  height: 40px;
  margin-right: $spacing-small;
}

.blog-name {
  font-size: $font-size-large;
  font-weight: bold;
  color: $text-primary;
}

.blog-desc {
  font-size: $font-size-small;
  color: $text-secondary;
}

.menu-list {
  flex: 1;
  margin-bottom: $spacing-base;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: $spacing-base;
  cursor: pointer;
  border-radius: $border-radius-base;
  transition: all 0.3s;
  
  &:hover {
    background-color: $border-color-extra-light;
  }
  
  &.is-active {
    background-color: rgba($primary-color, 0.1);
    color: $primary-color;
  }
}

.menu-icon {
  margin-right: $spacing-small;
  font-size: 18px;
}

.menu-text {
  font-size: $font-size-medium;
}

.search-box {
  padding: $spacing-base 0;
  display: flex;
  gap: $spacing-small;
}

.search-input {
  flex: 1;
}

.search-btn {
  flex-shrink: 0;
}
</style> 