<template>
  <div class="article-list">
    <!-- 骨架屏 -->
    <div v-if="loading" class="skeleton-list">
      <el-skeleton 
        v-for="index in 3" 
        :key="index" 
        :loading="loading" 
        animated 
        class="skeleton-item"
      >
        <template #template>
          <div class="skeleton-layout">
            <div class="skeleton-left">
              <el-skeleton-item variant="image" class="skeleton-cover" />
            </div>
            <div class="skeleton-right">
              <el-skeleton-item variant="h3" class="skeleton-title" />
              <el-skeleton-item variant="text" class="skeleton-summary" />
              <el-skeleton-item variant="text" class="skeleton-summary" />
              <div class="skeleton-meta">
                <el-skeleton-item variant="text" class="skeleton-meta-item" />
                <el-skeleton-item variant="text" class="skeleton-meta-item" />
              </div>
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>

    <!-- 文章列表 -->
    <div v-else class="list-container">
      <el-empty 
        v-if="articles.length === 0" 
        description="暂无文章"
        :image-size="200"
      />
      <div 
        v-for="article in articles" 
        :key="article.id" 
        class="article-item"
        @click="navigateToDetail(article.id)"
      >
        <div class="article-left">
          <div class="article-image-container">
            <img :src="article.cover" :alt="article.title" class="article-image">
          </div>
        </div>
        <div class="article-right">
          <h3 class="article-title">{{ article.title }}</h3>
          <p class="article-summary">{{ article.summary }}</p>
          <div class="article-meta">
            <div class="meta-left">
              <div class="meta-author">
                <img :src="article.author.avatar" :alt="article.author.name" class="author-avatar">
                <span class="author-name">{{ article.author.name }}</span>
              </div>
              <div class="meta-category">
                <el-tag size="small" effect="plain">{{ article.category.name }}</el-tag>
              </div>
            </div>
            <div class="meta-right">
              <span class="meta-time">
                <el-icon><Calendar /></el-icon>
                {{ formatDate(article.publishTime) }}
              </span>
              <span class="meta-views">
                <el-icon><View /></el-icon>
                {{ formatNumber(article.viewCount) }}
              </span>
              <span class="meta-comments">
                <el-icon><ChatDotRound /></el-icon>
                {{ article.commentCount }}
              </span>
            </div>
          </div>
          <div class="article-tags" @click.stop>
            <el-tag 
              v-for="tag in article.tags.slice(0, 3)" 
              :key="tag" 
              size="small" 
              effect="plain" 
              class="tag-item"
            >
              {{ tag }}
            </el-tag>
            <span v-if="article.tags.length > 3" class="more-tags">+{{ article.tags.length - 3 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, View, ChatDotRound } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

// 定义props接收文章数据和加载状态
interface Author {
  id: number
  name: string
  avatar: string
}

interface Category {
  id: number
  name: string
}

interface Article {
  id: number
  title: string
  summary: string
  cover: string
  publishTime: string
  viewCount: number
  commentCount: number
  author: Author
  category: Category
  tags: string[]
}

const props = defineProps<{
  articles: Article[]
  loading: boolean
}>()

const router = useRouter()

// 格式化日期
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

// 格式化数字 (如：1200 -> 1.2k)
const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

// 导航到文章详情页
const navigateToDetail = (id: number) => {
  router.push(`/article/${id}`)
}
</script>

<style lang="scss" scoped>
.article-list {
  width: 100%;
}

.skeleton-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-base;
}

.skeleton-item {
  background-color: #fff;
  border-radius: $border-radius-base;
  padding: $spacing-base;
  box-shadow: $box-shadow-light;
}

.skeleton-layout {
  display: flex;
  gap: $spacing-base;
}

.skeleton-left {
  flex: 0 0 240px;
  
  .is-mobile & {
    flex: 0 0 120px;
  }
}

.skeleton-cover {
  width: 100%;
  height: 160px;
  
  .is-mobile & {
    height: 100px;
  }
}

.skeleton-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: $spacing-small;
}

.skeleton-title {
  height: 32px;
  width: 80%;
}

.skeleton-summary {
  height: 16px;
}

.skeleton-meta {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

.skeleton-meta-item {
  width: 100px;
  height: 16px;
}

.list-container {
  display: flex;
  flex-direction: column;
  gap: $spacing-base;
}

.article-item {
  display: flex;
  background-color: #fff;
  border-radius: $border-radius-base;
  box-shadow: $box-shadow-light;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: $box-shadow-dark;
    
    .article-image {
      transform: scale(1.05);
    }
    
    .article-title {
      color: $primary-color;
    }
  }
  
  .is-mobile & {
    flex-direction: column;
  }
}

.article-left {
  flex: 0 0 240px;
  
  .is-mobile & {
    flex: none;
    width: 100%;
    height: 200px;
  }
  
  .is-tablet & {
    flex: 0 0 200px;
  }
}

.article-image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.article-right {
  flex: 1;
  padding: $spacing-base;
  display: flex;
  flex-direction: column;
}

.article-title {
  font-size: $font-size-large;
  font-weight: bold;
  margin-bottom: $spacing-small;
  color: $text-primary;
  transition: color 0.3s;
  
  .is-mobile & {
    font-size: $font-size-medium;
  }
}

.article-summary {
  color: $text-regular;
  margin-bottom: $spacing-base;
  font-size: $font-size-base;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 1.5;
  
  .is-mobile & {
    -webkit-line-clamp: 3;
  }
}

.article-meta {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: $spacing-small;
  margin-bottom: $spacing-small;
  
  .is-mobile & {
    flex-direction: column;
    align-items: flex-start;
  }
}

.meta-left, .meta-right {
  display: flex;
  align-items: center;
  gap: $spacing-small;
}

.meta-author {
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: $spacing-mini;
}

.meta-time, .meta-views, .meta-comments {
  display: flex;
  align-items: center;
  gap: 4px;
  color: $text-secondary;
  font-size: $font-size-small;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-mini;
}

.tag-item {
  transition: all 0.3s;
  
  &:hover {
    color: $primary-color;
    border-color: $primary-color;
  }
}

.more-tags {
  font-size: $font-size-small;
  color: $text-secondary;
  padding: 0 $spacing-mini;
}
</style> 