<template>
  <div class="article-detail">
    <!-- 文章头部信息 -->
    <div class="article-header">
      <h1 class="article-title">{{ article.title }}</h1>
      <div class="article-meta">
        <div class="meta-left">
          <div class="author-info">
            <img :src="article.author.avatar" :alt="article.author.name" class="author-avatar">
            <span class="author-name">{{ article.author.name }}</span>
          </div>
          <div class="publish-time">
            <el-icon><Calendar /></el-icon>
            {{ formatDate(article.publishTime) }}
          </div>
          <div class="view-count">
            <el-icon><View /></el-icon>
            {{ formatNumber(article.viewCount) }} 阅读
          </div>
        </div>
        <div class="meta-right">
          <el-button type="primary" plain @click="handleLike">
            <el-icon><Star /></el-icon>
            点赞 {{ formatNumber(article.likeCount) }}
          </el-button>
          <el-button plain @click="handleShare">
            <el-icon><Share /></el-icon>
            分享
          </el-button>
        </div>
      </div>
    </div>

    <!-- 文章内容 -->
    <div class="article-content">
      <div class="content-wrapper" v-html="renderedContent"></div>
    </div>

    <!-- 文章标签 -->
    <div class="article-tags">
      <el-tag 
        v-for="tag in article.tags" 
        :key="tag" 
        class="tag-item"
        @click="handleTagClick(tag)"
      >
        {{ tag }}
      </el-tag>
    </div>

    <!-- 文章底部 -->
    <div class="article-footer">
      <div class="copyright">
        <p>本文作者：{{ article.author.name }}</p>
        <p>本文链接：{{ currentUrl }}</p>
        <p>版权声明：本博客所有文章除特别声明外，均采用 CC BY-NC-SA 4.0 许可协议。</p>
      </div>
    </div>

    <!-- 评论区 -->
    <div class="comment-section">
      <h3 class="section-title">评论 ({{ article.commentCount }})</h3>
      
      <!-- 评论输入框 -->
      <div class="comment-input">
        <el-input
          v-model="commentContent"
          type="textarea"
          :rows="3"
          placeholder="写下你的评论..."
          :maxlength="500"
          show-word-limit
        />
        <div class="input-actions">
          <el-button type="primary" @click="submitComment" :loading="submitting">
            发表评论
          </el-button>
        </div>
      </div>

      <!-- 评论列表 -->
      <div class="comment-list" v-if="comments.length > 0">
        <div 
          v-for="comment in comments" 
          :key="comment.id" 
          class="comment-item"
        >
          <div class="comment-user">
            <img :src="comment.user.avatar" :alt="comment.user.name" class="user-avatar">
            <div class="user-info">
              <div class="user-name">{{ comment.user.name }}</div>
              <div class="comment-time">{{ formatDate(comment.createTime) }}</div>
            </div>
          </div>
          <div class="comment-content">{{ comment.content }}</div>
          <div class="comment-actions">
            <el-button link @click="handleReply(comment)">
              <el-icon><ChatDotRound /></el-icon>
              回复
            </el-button>
            <el-button link @click="handleLikeComment(comment)">
              <el-icon><Star /></el-icon>
              {{ comment.likeCount }}
            </el-button>
          </div>
        </div>
      </div>

      <!-- 无评论提示 -->
      <el-empty 
        v-else 
        description="暂无评论，快来抢沙发吧！"
        :image-size="200"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Calendar, View, Star, Share, ChatDotRound } from '@element-plus/icons-vue'
import { marked } from 'marked'
import { ElMessage } from 'element-plus'
import { getArticleDetail, likeArticle, getArticleComments, addComment, likeComment } from '@/api/article'
import type { Article, Comment, CommentPageResponse, CommentRequest, PageParams } from '@/types/article'

// 路由信息
const route = useRoute()
const router = useRouter()

// 文章数据
const article = ref<Article>({
  id: 0,
  title: '',
  content: '',
  publishTime: '',
  viewCount: 0,
  likeCount: 0,
  commentCount: 0,
  author: {
    id: 0,
    name: '',
    avatar: ''
  },
  tags: []
})

// 评论数据
const comments = ref<Comment[]>([])

// 评论分页
const commentPage = reactive<PageParams & { total: number }>({
  current: 1,
  size: 10,
  total: 0
})

// 评论内容
const commentContent = ref('')
const submitting = ref(false)

// 当前URL
const currentUrl = computed(() => window.location.href)

// 渲染后的文章内容
const renderedContent = computed(() => {
  return marked(article.value.content)
})

// 格式化日期
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

// 格式化数字
const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

// 获取文章详情
const fetchArticleDetail = async (id: number) => {
  try {
    const data = await getArticleDetail(id)
    article.value = data
  } catch (error) {
    console.error('获取文章详情失败：', error)
    ElMessage.error('获取文章详情失败')
  }
}

// 获取评论列表
const fetchComments = async () => {
  try {
    const data = await getArticleComments(article.value.id, {
      current: commentPage.current,
      size: commentPage.size
    })
    comments.value = data.list
    commentPage.total = data.total
  } catch (error) {
    console.error('获取评论列表失败：', error)
    ElMessage.error('获取评论列表失败')
  }
}

// 更新点赞处理函数
const handleLike = async () => {
  try {
    await likeArticle(article.value.id)
    article.value.likeCount++
    ElMessage.success('点赞成功！')
  } catch (error) {
    console.error('点赞失败：', error)
    ElMessage.error('点赞失败')
  }
}

// 处理分享
const handleShare = () => {
  // 实现分享功能
  ElMessage.info('分享功能开发中...')
}

// 处理标签点击
const handleTagClick = (tag: string) => {
  router.push({
    path: '/articles',
    query: { tag }
  })
}

// 更新评论提交函数
const submitComment = async () => {
  if (!commentContent.value.trim()) {
    ElMessage.warning('请输入评论内容')
    return
  }

  submitting.value = true
  
  try {
    const commentRequest: CommentRequest = {
      content: commentContent.value
    }
    await addComment(article.value.id, commentRequest)
    
    // 重新获取评论列表
    await fetchComments()
    
    commentContent.value = ''
    article.value.commentCount++
    ElMessage.success('评论成功！')
  } catch (error) {
    console.error('评论失败：', error)
    ElMessage.error('评论失败')
  } finally {
    submitting.value = false
  }
}

// 处理回复
const handleReply = (comment: any) => {
  commentContent.value = `@${comment.user.name} `
}

// 更新评论点赞处理函数
const handleLikeComment = async (comment: any) => {
  try {
    await likeComment(comment.id)
    comment.likeCount++
    ElMessage.success('点赞成功！')
  } catch (error) {
    console.error('点赞失败：', error)
    ElMessage.error('点赞失败')
  }
}

// 组件挂载
onMounted(async () => {
  const articleId = Number(route.params.id)
  if (articleId) {
    await fetchArticleDetail(articleId)
    await fetchComments()
  }
})
</script>

<style lang="scss" scoped>
.article-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: $spacing-large 0;
}

.article-header {
  margin-bottom: $spacing-large;
}

.article-title {
  font-size: $font-size-extra-large * 1.5;
  font-weight: bold;
  color: $text-primary;
  margin-bottom: $spacing-base;
  line-height: 1.4;
  
  .is-mobile & {
    font-size: $font-size-extra-large;
  }
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: $spacing-base;
  
  .is-mobile & {
    flex-direction: column;
    align-items: flex-start;
  }
}

.meta-left {
  display: flex;
  align-items: center;
  gap: $spacing-base;
  flex-wrap: wrap;
}

.author-info {
  display: flex;
  align-items: center;
  gap: $spacing-mini;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.author-name {
  font-weight: bold;
  color: $text-primary;
}

.publish-time,
.view-count {
  display: flex;
  align-items: center;
  gap: 4px;
  color: $text-secondary;
  font-size: $font-size-small;
}

.meta-right {
  display: flex;
  gap: $spacing-small;
}

.article-content {
  margin-bottom: $spacing-large;
  
  :deep(.content-wrapper) {
    font-size: $font-size-medium;
    line-height: 1.8;
    color: $text-regular;
    
    h1, h2, h3, h4, h5, h6 {
      margin: $spacing-large 0 $spacing-base;
      color: $text-primary;
      font-weight: bold;
    }
    
    h1 { font-size: $font-size-extra-large * 1.5; }
    h2 { font-size: $font-size-extra-large; }
    h3 { font-size: $font-size-large; }
    h4 { font-size: $font-size-medium; }
    
    p {
      margin-bottom: $spacing-base;
    }
    
    pre {
      background-color: $theme-light-bg;
      padding: $spacing-base;
      border-radius: $border-radius-base;
      overflow-x: auto;
      margin: $spacing-base 0;
    }
    
    code {
      font-family: Consolas, Monaco, 'Andale Mono', monospace;
      background-color: $theme-light-bg;
      padding: 2px 4px;
      border-radius: $border-radius-small;
    }
    
    blockquote {
      border-left: 4px solid $primary-color;
      padding-left: $spacing-base;
      margin: $spacing-base 0;
      color: $text-secondary;
    }
    
    img {
      max-width: 100%;
      border-radius: $border-radius-base;
      margin: $spacing-base 0;
    }
    
    ul, ol {
      padding-left: $spacing-large;
      margin-bottom: $spacing-base;
    }
    
    li {
      margin-bottom: $spacing-mini;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: $spacing-base 0;
      
      th, td {
        border: 1px solid $border-color-base;
        padding: $spacing-small;
        text-align: left;
      }
      
      th {
        background-color: $theme-light-bg;
        font-weight: bold;
      }
    }
  }
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-small;
  margin-bottom: $spacing-large;
}

.tag-item {
  cursor: pointer;
  
  &:hover {
    color: $primary-color;
    border-color: $primary-color;
  }
}

.article-footer {
  margin-bottom: $spacing-extra-large;
  padding: $spacing-large;
  background-color: $theme-light-bg;
  border-radius: $border-radius-base;
}

.copyright {
  color: $text-secondary;
  font-size: $font-size-small;
  line-height: 1.8;
}

.comment-section {
  margin-top: $spacing-extra-large;
}

.section-title {
  font-size: $font-size-large;
  font-weight: bold;
  color: $text-primary;
  margin-bottom: $spacing-large;
  padding-bottom: $spacing-small;
  border-bottom: 1px solid $border-color-lighter;
}

.comment-input {
  margin-bottom: $spacing-large;
}

.input-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: $spacing-small;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-large;
}

.comment-item {
  padding: $spacing-base;
  background-color: $theme-light-bg;
  border-radius: $border-radius-base;
}

.comment-user {
  display: flex;
  align-items: center;
  gap: $spacing-small;
  margin-bottom: $spacing-small;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: bold;
  color: $text-primary;
}

.comment-time {
  font-size: $font-size-small;
  color: $text-secondary;
}

.comment-content {
  margin: $spacing-small 0;
  line-height: 1.6;
  color: $text-regular;
}

.comment-actions {
  display: flex;
  gap: $spacing-base;
}
</style> 