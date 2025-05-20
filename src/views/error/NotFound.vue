<template>
  <div class="not-found">
    <div class="not-found-container">
      <div class="error-code">404</div>
      <div class="error-title">页面未找到</div>
      <div class="error-desc">抱歉，您访问的页面不存在或已被删除</div>
      <div class="actions">
        <el-button type="primary" size="large" @click="goBack">
          <el-icon><Back /></el-icon>
          返回上一页
        </el-button>
        <el-button size="large" @click="goHome">
          <el-icon><House /></el-icon>
          返回首页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Back, House } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回上一页
const goBack = () => {
  router.back()
}

// 返回首页
const goHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $spacing-large;
  background-color: $theme-light-bg;
}

.not-found-container {
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.error-code {
  font-size: 120px;
  font-weight: bold;
  color: $primary-color;
  line-height: 1.2;
  text-shadow: 0 8px 20px rgba($primary-color, 0.3);
  
  .is-mobile & {
    font-size: 80px;
  }
}

.error-title {
  font-size: $font-size-extra-large * 1.5;
  font-weight: bold;
  color: $text-primary;
  margin: $spacing-base 0;
  
  .is-mobile & {
    font-size: $font-size-extra-large;
  }
}

.error-desc {
  font-size: $font-size-medium;
  color: $text-secondary;
  margin-bottom: $spacing-large;
  
  .is-mobile & {
    font-size: $font-size-base;
  }
}

.actions {
  display: flex;
  justify-content: center;
  gap: $spacing-base;
  
  .is-mobile & {
    flex-direction: column;
    align-items: center;
  }
}
</style> 