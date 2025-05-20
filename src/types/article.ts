// 文章详情接口
export interface Article {
  id: number
  title: string
  content: string
  publishTime: string
  viewCount: number
  likeCount: number
  commentCount: number
  author: {
    id: number
    name: string
    avatar: string
  }
  tags: string[]
}

// 评论接口
export interface Comment {
  id: number
  content: string
  createTime: string
  likeCount: number
  user: {
    id: number
    name: string
    avatar: string
  }
}

// 分页参数
export interface PageParams {
  current: number
  size: number
}

// 分页响应
export interface PageResponse<T> {
  list: T[]
  total: number
}

// 评论分页响应
export type CommentPageResponse = PageResponse<Comment>

// 评论请求参数
export interface CommentRequest {
  content: string
} 