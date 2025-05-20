<template>
  <div class="home-container">
    <!-- 轮播图区域 -->
    <div class="banner-section">
      <el-carousel :interval="5000" :height="bannerHeight">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <router-link :to="item.link">
            <div class="banner-item" :style="{ backgroundImage: `url(${item.image})` }">
              <div class="banner-content">
                <h2 class="banner-title">{{ item.title }}</h2>
                <p class="banner-desc">{{ item.description }}</p>
              </div>
            </div>
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 置顶文章区域 -->
    <div class="featured-section">
      <div class="section-header">
        <h2 class="section-title">推荐文章</h2>
        <router-link to="/articles" class="more-link">
          更多文章 <el-icon><ArrowRight /></el-icon>
        </router-link>
      </div>
      <el-row :gutter="20">
        <el-col 
          v-for="article in featuredArticles" 
          :key="article.id" 
          :xs="24" 
          :sm="12" 
          :md="8" 
          :lg="8"
          class="featured-col"
        >
          <article-card :article="article" />
        </el-col>
      </el-row>
    </div>

    <!-- 最新文章区域 -->
    <div class="latest-section">
      <div class="section-header">
        <h2 class="section-title">最新发布</h2>
        <router-link to="/articles" class="more-link">
          更多文章 <el-icon><ArrowRight /></el-icon>
        </router-link>
      </div>
      <article-list :articles="latestArticles" :loading="loading" />
    </div>

    <!-- 分类展示区域 -->
    <div class="category-section">
      <div class="section-header">
        <h2 class="section-title">文章分类</h2>
        <router-link to="/categories" class="more-link">
          查看全部 <el-icon><ArrowRight /></el-icon>
        </router-link>
      </div>
      <el-row :gutter="20">
        <el-col 
          v-for="category in popularCategories" 
          :key="category.id" 
          :xs="12" 
          :sm="8" 
          :md="6" 
          :lg="4"
          class="category-col"
        >
          <router-link :to="`/categories?id=${category.id}`" class="category-card">
            <div class="category-icon">
              <el-icon :size="30"><component :is="category.icon || 'Folder'" /></el-icon>
            </div>
            <div class="category-info">
              <h3 class="category-name">{{ category.name }}</h3>
              <div class="category-count">{{ category.count }}篇文章</div>
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import ArticleCard from '@/components/article/ArticleCard.vue'
import ArticleList from '@/components/article/ArticleList.vue'
import { useWindowSize } from '@vueuse/core'

// 获取窗口尺寸
const { width } = useWindowSize()

// 根据设备类型设置轮播图高度
const bannerHeight = computed(() => {
  if (width.value < 768) {
    return '200px'
  } else if (width.value < 1200) {
    return '350px'
  } else {
    return '450px'
  }
})

// 页面加载状态
const loading = ref(true)

// 轮播图数据
const bannerList = ref([
  {
    title: '探索Vue3的新特性与最佳实践',
    description: '深入了解Vue3的Composition API、响应式系统及性能优化技巧',
    image: 'https://picsum.photos/id/1/1600/900',
    link: '/article/1'
  },
  {
    title: 'Spring Boot实战：从入门到精通',
    description: '快速构建企业级应用，掌握Spring Boot核心技术栈',
    image: 'https://picsum.photos/id/2/1600/900',
    link: '/article/2'
  },
  {
    title: '微服务架构设计与实现',
    description: '探索微服务架构模式，解决分布式系统挑战',
    image: 'https://picsum.photos/id/3/1600/900',
    link: '/article/3'
  }
])

// 推荐文章数据
const featuredArticles = ref([
  {
    id: 1,
    title: 'Vue3 Composition API完全指南',
    summary: '探索Vue3中的Composition API，了解如何通过组合式API提升代码可复用性和可维护性。',
    cover: 'https://picsum.photos/id/11/600/400',
    publishTime: '2023-07-15 14:30:00',
    viewCount: 1520,
    commentCount: 25,
    author: {
      id: 1,
      name: '张三',
      avatar: 'https://picsum.photos/id/1001/100/100'
    },
    category: {
      id: 1,
      name: '前端开发'
    },
    tags: ['Vue', 'JavaScript', '前端框架']
  },
  {
    id: 2,
    title: 'Spring Boot微服务架构实践',
    summary: '从零开始构建微服务架构，包含服务注册、配置中心、服务网关、断路器等核心组件的详细实现。',
    cover: 'https://picsum.photos/id/12/600/400',
    publishTime: '2023-07-12 09:45:00',
    viewCount: 980,
    commentCount: 18,
    author: {
      id: 2,
      name: '李四',
      avatar: 'https://picsum.photos/id/1002/100/100'
    },
    category: {
      id: 2,
      name: '后端开发'
    },
    tags: ['Spring Boot', '微服务', 'Java']
  },
  {
    id: 3,
    title: 'Docker容器化部署实战',
    summary: '详解Docker容器技术，从基础概念到实际部署，掌握容器化应用开发和运维的核心技能。',
    cover: 'https://picsum.photos/id/13/600/400',
    publishTime: '2023-07-08 16:20:00',
    viewCount: 1240,
    commentCount: 32,
    author: {
      id: 3,
      name: '王五',
      avatar: 'https://picsum.photos/id/1003/100/100'
    },
    category: {
      id: 3,
      name: 'DevOps'
    },
    tags: ['Docker', '容器化', '运维']
  }
])

// 最新文章数据
const latestArticles = ref([
  {
    id: 4,
    title: 'TypeScript高级类型系统详解',
    summary: '深入理解TypeScript类型系统，掌握高级类型技巧，提升代码健壮性和开发效率。',
    cover: 'https://picsum.photos/id/14/600/400',
    publishTime: '2023-07-20 10:30:00',
    viewCount: 860,
    commentCount: 15,
    author: {
      id: 1,
      name: '张三',
      avatar: 'https://picsum.photos/id/1001/100/100'
    },
    category: {
      id: 1,
      name: '前端开发'
    },
    tags: ['TypeScript', '前端', '类型系统']
  },
  {
    id: 5,
    title: 'Redis高性能缓存实战',
    summary: '掌握Redis缓存技术，解决高并发场景下的性能挑战，包含实战案例和最佳实践。',
    cover: 'https://picsum.photos/id/15/600/400',
    publishTime: '2023-07-18 14:15:00',
    viewCount: 720,
    commentCount: 12,
    author: {
      id: 2,
      name: '李四',
      avatar: 'https://picsum.photos/id/1002/100/100'
    },
    category: {
      id: 2,
      name: '后端开发'
    },
    tags: ['Redis', '缓存', '高性能']
  },
  {
    id: 6,
    title: 'React Native跨平台APP开发',
    summary: '一次编码，多端运行，了解React Native跨平台开发技术的优势与挑战。',
    cover: 'https://picsum.photos/id/16/600/400',
    publishTime: '2023-07-16 11:40:00',
    viewCount: 650,
    commentCount: 10,
    author: {
      id: 3,
      name: '王五',
      avatar: 'https://picsum.photos/id/1003/100/100'
    },
    category: {
      id: 4,
      name: '移动开发'
    },
    tags: ['React Native', '跨平台', '移动应用']
  },
  {
    id: 7,
    title: 'MongoDB数据库设计与优化',
    summary: '探索MongoDB文档数据库的设计原则，掌握查询优化和性能调优技巧。',
    cover: 'https://picsum.photos/id/17/600/400',
    publishTime: '2023-07-14 09:30:00',
    viewCount: 580,
    commentCount: 8,
    author: {
      id: 2,
      name: '李四',
      avatar: 'https://picsum.photos/id/1002/100/100'
    },
    category: {
      id: 2,
      name: '后端开发'
    },
    tags: ['MongoDB', '数据库', 'NoSQL']
  }
])

// 热门分类数据
const popularCategories = ref([
  { id: 1, name: '前端开发', count: 28, icon: 'Monitor' },
  { id: 2, name: '后端开发', count: 32, icon: 'CPU' },
  { id: 3, name: 'DevOps', count: 18, icon: 'SetUp' },
  { id: 4, name: '移动开发', count: 15, icon: 'Cellphone' },
  { id: 5, name: '数据库', count: 20, icon: 'DataLine' },
  { id: 6, name: '人工智能', count: 12, icon: 'Opportunity' }
])

// 页面初始化
onMounted(() => {
  // 模拟接口加载
  setTimeout(() => {
    loading.value = false
  }, 800)
})
</script>

<style lang="scss" scoped>
.home-container {
  padding-bottom: $spacing-extra-large;
}

.banner-section {
  margin-bottom: $spacing-large;
}

.banner-item {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%);
  }
}

.banner-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: $spacing-extra-large;
  color: #fff;
  
  .is-mobile & {
    padding: $spacing-base;
  }
}

.banner-title {
  font-size: $font-size-extra-large * 1.5;
  font-weight: bold;
  margin-bottom: $spacing-small;
  
  .is-mobile & {
    font-size: $font-size-large;
  }
}

.banner-desc {
  font-size: $font-size-medium;
  max-width: 80%;
  
  .is-mobile & {
    font-size: $font-size-base;
    max-width: 100%;
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-large;
  
  .is-mobile & {
    margin-bottom: $spacing-base;
  }
}

.section-title {
  font-size: $font-size-extra-large;
  font-weight: bold;
  position: relative;
  padding-left: $spacing-base;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 20px;
    background-color: $primary-color;
    border-radius: $border-radius-small;
  }
  
  .is-mobile & {
    font-size: $font-size-large;
  }
}

.more-link {
  color: $primary-color;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s;
  
  &:hover {
    color: darken($primary-color, 10%);
  }
}

.featured-section,
.latest-section,
.category-section {
  margin-bottom: $spacing-extra-large;
  
  .is-mobile & {
    margin-bottom: $spacing-large;
  }
}

.featured-col,
.category-col {
  margin-bottom: $spacing-base;
}

.category-card {
  background-color: #fff;
  border-radius: $border-radius-base;
  box-shadow: $box-shadow-light;
  padding: $spacing-base;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  height: 100%;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: $box-shadow-dark;
    
    .category-icon {
      background-color: $primary-color;
      color: #fff;
    }
  }
}

.category-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba($primary-color, 0.1);
  color: $primary-color;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: $spacing-base;
  transition: all 0.3s;
  
  .is-mobile & {
    width: 50px;
    height: 50px;
  }
}

.category-info {
  flex: 1;
}

.category-name {
  font-size: $font-size-medium;
  font-weight: bold;
  margin-bottom: 4px;
  color: $text-primary;
}

.category-count {
  font-size: $font-size-small;
  color: $text-secondary;
}
</style> 