<template>
  <div class="about-container">
    <div class="about-header">
      <h1 class="page-title">关于我</h1>
      <div class="header-divider"></div>
    </div>
    
    <el-card class="about-card">
      <div class="author-info">
        <div class="author-avatar">
          <img src="https://picsum.photos/id/1005/300/300" alt="博主头像">
        </div>
        <div class="author-profile">
          <h2 class="author-name">Qian</h2>
          <p class="author-title">全栈开发工程师</p>
          <div class="author-social">
            <a href="https://github.com" target="_blank" class="social-link" title="GitHub">
              <el-icon><Position /></el-icon>
            </a>
            <a href="mailto:example@example.com" class="social-link" title="Email">
              <el-icon><Message /></el-icon>
            </a>
            <a href="https://weibo.com" target="_blank" class="social-link" title="微博">
              <el-icon><Position /></el-icon>
            </a>
          </div>
        </div>
      </div>
      
      <el-divider />
      
      <div class="about-content">
        <div class="about-section">
          <h3 class="section-title">
            <el-icon><User /></el-icon>
            个人简介
          </h3>
          <div class="section-content">
            <p>你好，我是Qian，一名热爱编程和技术的全栈开发工程师。拥有多年的软件开发经验，专注于Web应用开发、微服务架构和云原生技术。</p>
            <p>在工作之余，我喜欢分享技术心得，探索新技术，并通过这个博客记录自己的学习和思考。希望能够通过分享，与更多志同道合的朋友一起成长。</p>
          </div>
        </div>
        
        <div class="about-section">
          <h3 class="section-title">
            <el-icon><Medal /></el-icon>
            专业技能
          </h3>
          <div class="section-content">
            <div class="skills-container">
              <div class="skill-item" v-for="skill in skills" :key="skill.name">
                <div class="skill-header">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-level">{{ skill.level }}</span>
                </div>
                <el-progress :percentage="skill.percentage" :color="skill.color" :striped="true" />
              </div>
            </div>
          </div>
        </div>
        
        <div class="about-section">
          <h3 class="section-title">
            <el-icon><Suitcase /></el-icon>
            工作经历
          </h3>
          <div class="section-content">
            <el-timeline>
              <el-timeline-item
                v-for="(experience, index) in workExperiences"
                :key="index"
                :timestamp="experience.period"
                placement="top"
                :color="experience.color"
              >
                <el-card class="experience-card">
                  <h4 class="experience-title">{{ experience.position }}</h4>
                  <div class="experience-company">{{ experience.company }}</div>
                  <div class="experience-desc">{{ experience.description }}</div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
        
        <div class="about-section">
          <h3 class="section-title">
            <el-icon><School /></el-icon>
            教育背景
          </h3>
          <div class="section-content">
            <el-timeline>
              <el-timeline-item
                v-for="(education, index) in educations"
                :key="index"
                :timestamp="education.period"
                placement="top"
                color="#409EFF"
              >
                <el-card class="education-card">
                  <h4 class="education-degree">{{ education.degree }}</h4>
                  <div class="education-school">{{ education.school }}</div>
                  <div class="education-major">{{ education.major }}</div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
        
        <div class="about-section">
          <h3 class="section-title">
            <el-icon><Message /></el-icon>
            联系我
          </h3>
          <div class="section-content">
            <p>如果您有任何问题、合作意向或者交流想法，欢迎通过以下方式联系我：</p>
            <ul class="contact-list">
              <li class="contact-item">
                <el-icon><Message /></el-icon>
                <span>邮箱：example@example.com</span>
              </li>
              <li class="contact-item">
                <el-icon><Location /></el-icon>
                <span>地点：中国，杭州</span>
              </li>
              <li class="contact-item">
                <el-icon><ChatDotRound /></el-icon>
                <span>微信：wechat_example</span>
              </li>
            </ul>
            <p>也欢迎在文章下方留言，我会尽快回复！</p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  User, Medal, Suitcase, School, Message, 
  Location, ChatDotRound, Position 
} from '@element-plus/icons-vue'

// 技能数据
const skills = ref([
  { name: 'Java / Spring Boot', level: '精通', percentage: 95, color: '#67C23A' },
  { name: 'Vue / React', level: '精通', percentage: 90, color: '#409EFF' },
  { name: 'Node.js', level: '熟练', percentage: 85, color: '#E6A23C' },
  { name: '微服务 / Docker', level: '熟练', percentage: 80, color: '#F56C6C' },
  { name: 'MySQL / Redis', level: '熟练', percentage: 85, color: '#909399' },
  { name: '云原生 / DevOps', level: '掌握', percentage: 75, color: '#6B8E23' }
])

// 工作经历
const workExperiences = ref([
  {
    position: '高级全栈开发工程师',
    company: 'XX科技有限公司',
    period: '2021年至今',
    description: '负责公司核心业务系统的架构设计和开发，带领团队完成微服务架构转型，提升系统性能和可扩展性。',
    color: '#67C23A'
  },
  {
    position: '前端开发工程师',
    company: 'YY互联网公司',
    period: '2018年 - 2021年',
    description: '负责公司多个Web项目的前端开发，优化用户体验，实现响应式布局，提升页面加载速度和交互体验。',
    color: '#409EFF'
  },
  {
    position: '软件开发实习生',
    company: 'ZZ软件科技有限公司',
    period: '2017年 - 2018年',
    description: '参与公司内部管理系统的开发，负责功能模块实现和Bug修复，积累了实际项目经验。',
    color: '#E6A23C'
  }
])

// 教育背景
const educations = ref([
  {
    degree: '硕士学位',
    school: 'XX大学',
    major: '计算机科学与技术',
    period: '2015年 - 2018年'
  },
  {
    degree: '学士学位',
    school: 'YY大学',
    major: '软件工程',
    period: '2011年 - 2015年'
  }
])
</script>

<style lang="scss" scoped>
.about-container {
  padding: $spacing-base;
  
  .is-desktop & {
    padding: $spacing-large 0;
  }
}

.about-header {
  margin-bottom: $spacing-large;
  text-align: center;
}

.page-title {
  font-size: $font-size-extra-large * 1.5;
  font-weight: bold;
  color: $text-primary;
  margin-bottom: $spacing-base;
}

.header-divider {
  width: 50px;
  height: 4px;
  background-color: $primary-color;
  margin: 0 auto;
  border-radius: $border-radius-small;
}

.about-card {
  margin-bottom: $spacing-large;
}

.author-info {
  display: flex;
  align-items: center;
  gap: $spacing-large;
  margin-bottom: $spacing-large;
  
  .is-mobile & {
    flex-direction: column;
    text-align: center;
  }
}

.author-avatar {
  flex-shrink: 0;
  
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    
    .is-mobile & {
      width: 120px;
      height: 120px;
    }
  }
}

.author-profile {
  flex: 1;
}

.author-name {
  font-size: $font-size-extra-large;
  font-weight: bold;
  color: $text-primary;
  margin-bottom: $spacing-mini;
}

.author-title {
  font-size: $font-size-medium;
  color: $text-regular;
  margin-bottom: $spacing-base;
}

.author-social {
  display: flex;
  gap: $spacing-small;
  
  .is-mobile & {
    justify-content: center;
  }
}

.social-link {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: $border-color-extra-light;
  color: $text-secondary;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  
  &:hover {
    background-color: $primary-color;
    color: #fff;
  }
}

.about-section {
  margin-bottom: $spacing-large;
}

.section-title {
  display: flex;
  align-items: center;
  gap: $spacing-small;
  font-size: $font-size-large;
  font-weight: bold;
  color: $text-primary;
  margin-bottom: $spacing-base;
  padding-bottom: $spacing-small;
  border-bottom: 1px solid $border-color-lighter;
}

.section-content {
  color: $text-regular;
  line-height: 1.6;
  
  p {
    margin-bottom: $spacing-base;
  }
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: $spacing-base;
  
  .is-mobile & {
    grid-template-columns: 1fr;
  }
}

.skill-item {
  margin-bottom: $spacing-small;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: $spacing-mini;
}

.skill-name {
  font-weight: bold;
  color: $text-primary;
}

.skill-level {
  color: $text-secondary;
}

.experience-card,
.education-card {
  margin-bottom: $spacing-base;
}

.experience-title,
.education-degree {
  font-size: $font-size-medium;
  font-weight: bold;
  color: $text-primary;
  margin-bottom: $spacing-mini;
}

.experience-company,
.education-school {
  font-size: $font-size-base;
  color: $primary-color;
  margin-bottom: $spacing-mini;
}

.experience-desc,
.education-major {
  font-size: $font-size-base;
  color: $text-regular;
}

.contact-list {
  margin: $spacing-base 0;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: $spacing-small;
  margin-bottom: $spacing-small;
}
</style> 