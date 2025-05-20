import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

// 路由配置
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/Home.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: 'articles',
        name: 'articles',
        component: () => import('@/views/article/ArticleList.vue'),
        meta: {
          title: '文章列表'
        }
      },
      {
        path: 'article/:id',
        name: 'article-detail',
        component: () => import('@/views/article/ArticleDetail.vue'),
        meta: {
          title: '文章详情'
        }
      },
      {
        path: 'categories',
        name: 'CategoryList',
        component: () => import('@/views/category/CategoryList.vue'),
        meta: {
          title: '分类列表',
          keepAlive: true
        }
      },
      {
        path: 'tags',
        name: 'TagList',
        component: () => import('@/views/tag/TagList.vue'),
        meta: {
          title: '标签列表',
          keepAlive: true
        }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/about/About.vue'),
        meta: {
          title: '关于我'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/error/NotFound.vue'),
    meta: {
      title: '页面未找到'
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 滚动行为控制
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title} - Qian Blog`
  next()
})

export default router 