<template>
  <div class="article-page">
    <div class="page-header">
      <h1 class="page-title">文章列表</h1>
      <div class="header-divider"></div>
      <p class="page-desc">探索发现更多精彩内容</p>
    </div>
    
    <div class="filter-container">
      <el-card class="filter-card">
        <div class="filter-header">
          <div class="filter-title">
            <el-icon><Filter /></el-icon>
            筛选条件
          </div>
          <el-button link @click="resetFilters">
            <el-icon><RefreshRight /></el-icon>
            重置
          </el-button>
        </div>
        
        <div class="filter-body">
          <div class="filter-section">
            <div class="section-title">分类：</div>
            <div class="section-content">
              <el-radio-group v-model="filters.category" size="small">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button 
                  v-for="category in categories" 
                  :key="category.id" 
                  :label="category.id"
                >
                  {{ category.name }}
                </el-radio-button>
              </el-radio-group>
            </div>
          </div>
          
          <div class="filter-section">
            <div class="section-title">标签：</div>
            <div class="section-content">
              <el-check-tag
                v-for="tag in popularTags"
                :key="tag.id"
                :checked="filters.tags.includes(tag.id)"
                @change="tagChange(tag.id)"
                class="tag-item"
              >
                {{ tag.name }}
              </el-check-tag>
            </div>
          </div>
          
          <div class="filter-section">
            <div class="section-title">排序：</div>
            <div class="section-content">
              <el-radio-group v-model="filters.sort" size="small">
                <el-radio-button label="newest">最新发布</el-radio-button>
                <el-radio-button label="popular">最多阅读</el-radio-button>
                <el-radio-button label="commented">最多评论</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          
          <div class="filter-section">
            <div class="section-title">搜索：</div>
            <div class="section-content">
              <el-input
                v-model="filters.keyword"
                placeholder="搜索文章标题或内容..."
                clearable
                @keyup.enter="loadArticles"
              >
                <template #prefix>
                  <el-icon><Search /></el-icon>
                </template>
                <template #append>
                  <el-button @click="loadArticles">搜索</el-button>
                </template>
              </el-input>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    
    <!-- 当前筛选条件展示 -->
    <div class="current-filters" v-if="hasFilters">
      <div class="filter-tags">
        <div class="filter-label">当前筛选：</div>
        <el-tag 
          v-if="filters.category" 
          closable 
          @close="filters.category = ''"
        >
          分类：{{ getCategoryName(filters.category) }}
        </el-tag>
        <el-tag 
          v-for="tagId in filters.tags" 
          :key="tagId" 
          closable 
          @close="removeTag(tagId)"
        >
          标签：{{ getTagName(tagId) }}
        </el-tag>
        <el-tag 
          v-if="filters.keyword" 
          closable 
          @close="filters.keyword = ''"
        >
          关键词：{{ filters.keyword }}
        </el-tag>
        <el-tag>
          排序：{{ getSortName(filters.sort) }}
        </el-tag>
      </div>
    </div>
    
    <!-- 文章列表 -->
    <article-list :articles="articles" :loading="loading" />
    
    <!-- 分页器 -->
    <div class="pagination-container" v-if="!loading && articles.length > 0">
      <el-pagination
        v-model:current-page="page.current"
        v-model:page-size="page.size"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Filter, Search, RefreshRight } from '@element-plus/icons-vue'
import ArticleList from '@/components/article/ArticleList.vue'

// 路由信息
const route = useRoute()
const router = useRouter()

// 文章加载状态
const loading = ref(true)

// 分页信息
const page = reactive({
  current: 1,
  size: 10,
  total: 0
})

// 筛选条件
const filters = reactive({
  category: '',
  tags: [] as string[],
  keyword: '',
  sort: 'newest'
})

// 是否有筛选条件
const hasFilters = computed(() => {
  return filters.category || filters.tags.length > 0 || filters.keyword
})

// 分类数据
const categories = ref([
  { id: '1', name: '前端开发' },
  { id: '2', name: '后端开发' },
  { id: '3', name: 'DevOps' },
  { id: '4', name: '移动开发' },
  { id: '5', name: '数据库' },
  { id: '6', name: '人工智能' }
])

// 热门标签
const popularTags = ref([
  { id: '1', name: 'JavaScript' },
  { id: '2', name: 'Vue' },
  { id: '3', name: 'React' },
  { id: '4', name: 'Java' },
  { id: '5', name: 'Spring Boot' },
  { id: '6', name: '微服务' },
  { id: '7', name: 'Docker' },
  { id: '8', name: 'MySQL' },
  { id: '9', name: 'Redis' },
  { id: '10', name: 'TypeScript' }
])

// 文章数据
const articles = ref([
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
  },
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
  }
])

// 获取分类名称
const getCategoryName = (id: string): string => {
  const category = categories.value.find(item => item.id === id)
  return category ? category.name : ''
}

// 获取标签名称
const getTagName = (id: string): string => {
  const tag = popularTags.value.find(item => item.id === id)
  return tag ? tag.name : ''
}

// 获取排序名称
const getSortName = (sort: string): string => {
  const sortMap: Record<string, string> = {
    newest: '最新发布',
    popular: '最多阅读',
    commented: '最多评论'
  }
  return sortMap[sort] || ''
}

// 标签选择变化
const tagChange = (tagId: string) => {
  const index = filters.tags.indexOf(tagId)
  if (index === -1) {
    filters.tags.push(tagId)
  } else {
    filters.tags.splice(index, 1)
  }
}

// 移除标签
const removeTag = (tagId: string) => {
  const index = filters.tags.indexOf(tagId)
  if (index !== -1) {
    filters.tags.splice(index, 1)
  }
}

// 重置筛选条件
const resetFilters = () => {
  filters.category = ''
  filters.tags = []
  filters.keyword = ''
  filters.sort = 'newest'
  page.current = 1
  loadArticles()
}

// 分页大小变化
const handleSizeChange = (size: number) => {
  page.size = size
  loadArticles()
}

// 当前页变化
const handleCurrentChange = (current: number) => {
  page.current = current
  loadArticles()
}

// 加载文章列表
const loadArticles = () => {
  loading.value = true
  
  // 这里应该是从API获取数据，目前使用模拟数据
  setTimeout(() => {
    page.total = 100 // 假设总数为100
    loading.value = false
    
    // 更新URL参数，方便分享
    const query: Record<string, string> = {}
    if (filters.category) query.category = filters.category
    if (filters.tags.length) query.tags = filters.tags.join(',')
    if (filters.keyword) query.keyword = filters.keyword
    if (filters.sort !== 'newest') query.sort = filters.sort
    if (page.current > 1) query.page = page.current.toString()
    if (page.size !== 10) query.size = page.size.toString()
    
    router.push({ path: route.path, query })
  }, 800)
}

// 从URL参数中初始化筛选条件
const initFiltersFromQuery = () => {
  const query = route.query
  
  if (query.category) filters.category = query.category as string
  
  if (query.tags) {
    const tagIds = (query.tags as string).split(',')
    filters.tags = tagIds
  }
  
  if (query.keyword) filters.keyword = query.keyword as string
  
  if (query.sort) filters.sort = query.sort as string
  
  if (query.page) page.current = parseInt(query.page as string, 10)
  
  if (query.size) page.size = parseInt(query.size as string, 10)
}

// 监听筛选条件变化
watch([
  () => filters.category,
  () => filters.sort
], () => {
  page.current = 1
  loadArticles()
})

// 组件挂载
onMounted(() => {
  initFiltersFromQuery()
  loadArticles()
})
</script>

<style lang="scss" scoped>
.article-page {
  padding-bottom: $spacing-extra-large;
}

.page-header {
  text-align: center;
  margin-bottom: $spacing-large;
}

.page-title {
  font-size: $font-size-extra-large * 1.5;
  font-weight: bold;
  color: $text-primary;
  margin-bottom: $spacing-small;
}

.header-divider {
  width: 50px;
  height: 4px;
  background-color: $primary-color;
  margin: 0 auto $spacing-small;
  border-radius: $border-radius-small;
}

.page-desc {
  color: $text-secondary;
  font-size: $font-size-medium;
}

.filter-container {
  margin-bottom: $spacing-large;
}

.filter-card {
  background-color: #fff;
  border-radius: $border-radius-base;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-base;
  padding-bottom: $spacing-small;
  border-bottom: 1px solid $border-color-lighter;
}

.filter-title {
  font-size: $font-size-medium;
  font-weight: bold;
  color: $text-primary;
  display: flex;
  align-items: center;
  gap: $spacing-mini;
}

.filter-body {
  display: flex;
  flex-direction: column;
  gap: $spacing-base;
}

.filter-section {
  display: flex;
  align-items: center;
  
  .is-mobile & {
    flex-direction: column;
    align-items: flex-start;
    gap: $spacing-small;
  }
}

.section-title {
  flex: 0 0 70px;
  font-weight: bold;
  color: $text-primary;
}

.section-content {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-small;
}

.tag-item {
  margin-right: $spacing-mini;
  margin-bottom: $spacing-mini;
  cursor: pointer;
}

.current-filters {
  margin-bottom: $spacing-large;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: $spacing-small;
}

.filter-label {
  color: $text-secondary;
  font-size: $font-size-small;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: $spacing-large;
}
</style> 