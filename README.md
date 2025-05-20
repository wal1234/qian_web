# Qian Blog 前端展示系统

这是一个基于Vue 3、Vite和Element Plus构建的博客前端展示系统，支持PC端、手机端和平板端的响应式布局。

## 项目特点

- 使用Vue 3 + TypeScript开发，采用Composition API
- 基于Vite构建工具，提供快速的开发体验
- 使用Element Plus UI组件库，美观实用
- 响应式设计，适配PC端、手机端和平板端
- 模块化开发，代码结构清晰

## 功能模块

- 首页：展示推荐文章、最新文章和分类导航
- 文章列表：支持分类筛选和标签筛选
- 文章详情：支持Markdown渲染，代码高亮，目录导航
- 分类页面：展示所有文章分类
- 标签页面：展示所有文章标签
- 关于页面：博主个人介绍

## 项目结构

```
qian_web/
├── public/             # 静态资源
├── src/
│   ├── api/            # API请求接口
│   ├── assets/         # 资源文件（图片、样式等）
│   ├── components/     # 公共组件
│   ├── router/         # 路由配置
│   ├── store/          # 状态管理
│   ├── utils/          # 工具函数
│   ├── views/          # 页面组件
│   ├── App.vue         # 根组件
│   └── main.ts         # 入口文件
├── .gitignore          # Git忽略文件
├── index.html          # HTML模板
├── package.json        # 项目依赖
├── tsconfig.json       # TypeScript配置
└── vite.config.ts      # Vite配置
```

## 运行项目

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 技术栈

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- Element Plus
- Marked (Markdown渲染)
- Highlight.js (代码高亮)
- SCSS (样式预处理)

## 响应式设计

- 移动端: < 768px
- 平板端: 768px - 1200px
- 桌面端: > 1200px

## 接口说明

项目默认连接到本地后端API服务：

```
/api/* -> http://localhost:8080/*
```

可以在vite.config.ts中修改代理配置以连接到其他后端服务。

## 开发指南

1. 组件开发遵循Vue 3 Composition API风格
2. 使用TypeScript进行类型检查
3. 样式使用SCSS预处理器，基于变量系统
4. 响应式布局基于Element Plus栅格系统和媒体查询 