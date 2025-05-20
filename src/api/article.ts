import request from '@/utils/request'

// 获取文章详情
export function getArticleDetail(id: number) {
  return request({
    url: `/api/articles/${id}`,
    method: 'get'
  })
}

// 获取文章列表
export function getArticleList(params: any) {
  return request({
    url: '/api/articles',
    method: 'get',
    params
  })
}

// 点赞文章
export function likeArticle(id: number) {
  return request({
    url: `/api/articles/${id}/like`,
    method: 'post'
  })
}

// 获取文章评论列表
export function getArticleComments(articleId: number, params: any) {
  return request({
    url: `/api/articles/${articleId}/comments`,
    method: 'get',
    params
  })
}

// 发表评论
export function addComment(articleId: number, data: any) {
  return request({
    url: `/api/articles/${articleId}/comments`,
    method: 'post',
    data
  })
}

// 点赞评论
export function likeComment(commentId: number) {
  return request({
    url: `/api/comments/${commentId}/like`,
    method: 'post'
  })
} 