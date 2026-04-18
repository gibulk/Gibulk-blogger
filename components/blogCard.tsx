import { Post } from '@/lib/supabase/types'
import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="h-full rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {post.cover_image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-6">
          {post.tags && post.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-2 text-gray-600 text-sm line-clamp-2">
              {post.excerpt}
            </p>
          )}
          <div className="mt-4 flex items-center text-xs text-gray-500">
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
            <span className="mx-1">·</span>
            <span>{post.views} views</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
