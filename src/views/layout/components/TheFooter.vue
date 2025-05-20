<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <!-- 社交媒体链接 -->
        <div class="social-links">
          <a href="https://github.com" target="_blank" class="social-link" title="GitHub">
            <el-icon><Position /></el-icon>
          </a>
          <a href="https://weibo.com" target="_blank" class="social-link" title="微博">
            <el-icon><Position /></el-icon>
          </a>
          <a href="https://twitter.com" target="_blank" class="social-link" title="Twitter">
            <el-icon><Position /></el-icon>
          </a>
        </div>
        
        <!-- 版权信息 -->
        <div class="copyright">
          &copy; {{ currentYear }} Qian Blog. All Rights Reserved.
        </div>
        
        <!-- 备案信息 -->
        <div class="icp">
          <a href="https://beian.miit.gov.cn/" target="_blank" class="icp-link">
            浙ICP备12345678号-1
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 获取当前年份
const currentYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  background-color: #fff;
  border-top: 1px solid $border-color-lighter;
  padding: $spacing-large 0;
  
  .is-mobile & {
    padding: $spacing-base 0;
  }
}

.footer-container {
  margin: 0 auto;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $spacing-base;
  
  .is-mobile & {
    gap: $spacing-small;
  }
}

.social-links {
  display: flex;
  gap: $spacing-base;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: $text-secondary;
  background-color: $border-color-extra-light;
  transition: all 0.3s;
  
  &:hover {
    color: #fff;
    background-color: $primary-color;
  }
  
  .is-mobile & {
    width: 32px;
    height: 32px;
  }
}

.copyright, .icp {
  color: $text-secondary;
  font-size: $font-size-small;
  text-align: center;
}

.icp-link {
  color: $text-secondary;
  transition: color 0.3s;
  
  &:hover {
    color: $primary-color;
  }
}
</style> 