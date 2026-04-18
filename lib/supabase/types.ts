export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image: string | null
  tags: string[]
  published: boolean
  views: number
  created_at: string
  updated_at: string
}

export interface CreatePostInput {
  title: string
  slug?: string
  excerpt?: string
  content: string
  cover_image?: string
  tags?: string[]
  published?: boolean
}

export interface UpdatePostInput extends Partial<CreatePostInput> {
  id: string
}
