<template>
  <div class="article-card">
    <div class="article-cover" @click="navigateToDetail">
      <img :src="article.cover" :alt="article.title" class="cover-image" />
      <div class="category-tag">{{ article.category.name }}</div>
    </div>
    <div class="article-content">
      <h3 class="article-title" @click="navigateToDetail">{{ article.title }}</h3>
      <p class="article-summary">{{ article.summary }}</p>
      <div class="article-meta">
        <div class="meta-author">
          <img :src="article.author.avatar" :alt="article.author.name" class="author-avatar" />
          <span class="author-name">{{ article.author.name }}</span>
        </div>
        <div class="meta-info">
          <span class="meta-item">
            <el-icon><Calendar /></el-icon>
            {{ formatDate(article.publishTime) }}
          </span>
          <span class="meta-item">
            <el-icon><View /></el-icon>
            {{ formatNumber(article.viewCount) }}
          </span>
          <span class="meta-item">
            <el-icon><ChatDotRound /></el-icon>
            {{ article.commentCount }}
          </span>
        </div>
      </div>
      <div class="article-tags">
        <el-tag 
          v-for="tag in article.tags" 
          :key="tag" 
          size="small" 
          effect="plain" 
          class="tag-item"
        >
          {{ tag }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, View, ChatDotRound } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

// 定义props接收文章数据
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
  article: Article
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
const navigateToDetail = () => {
  router.push(`/article/${props.article.id}`)
}
</script>

<style lang="scss" scoped>
.article-card {
  background-color: #fff;
  border-radius: $border-radius-base;
  box-shadow: $box-shadow-light;
  overflow: hidden;
  transition: all 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: $box-shadow-dark;
    
    .cover-image {
      transform: scale(1.05);
    }
  }
}

.article-cover {
  position: relative;
  overflow: hidden;
  height: 0;
  padding-bottom: 56.25%; // 16:9 比例
  cursor: pointer;
}

.cover-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.category-tag {
  position: absolute;
  top: $spacing-small;
  right: $spacing-small;
  background-color: rgba($primary-color, 0.8);
  color: #fff;
  padding: 2px $spacing-small;
  border-radius: $border-radius-small;
  font-size: $font-size-small;
}

.article-content {
  padding: $spacing-base;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.article-title {
  font-size: $font-size-large;
  font-weight: bold;
  margin-bottom: $spacing-small;
  color: $text-primary;
  cursor: pointer;
  transition: color 0.3s;
  
  &:hover {
    color: $primary-color;
  }
  
  @include text-ellipsis;
}

.article-summary {
  color: $text-regular;
  margin-bottom: $spacing-base;
  font-size: $font-size-base;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  line-height: 1.5;
}

.article-meta {
  margin-top: auto;
  margin-bottom: $spacing-small;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  font-size: $font-size-small;
  color: $text-secondary;
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

.meta-info {
  display: flex;
  gap: $spacing-small;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 2px;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-mini;
  margin-top: $spacing-small;
}

.tag-item {
  cursor: pointer;
  
  &:hover {
    color: $primary-color;
    border-color: $primary-color;
  }
}
</style> 