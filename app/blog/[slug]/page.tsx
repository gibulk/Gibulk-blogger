import { createServerClientInstance } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const supabase = await createServerClientInstance()
  
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} - Gibulk`,
    description: post.excerpt || post.content.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.cover_image ? [post.cover_image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const supabase = await createServerClientInstance()
  
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) {
    notFound()
  }

  // Update views
  await supabase
    .from('posts')
    .update({ views: (post.views || 0) + 1 })
    .eq('id', post.id)

  // Get related posts by tags
  const { data: relatedPosts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .neq('id', post.id)
    .overlaps('tags', post.tags || [])
    .limit(3)

  return (
    <article className="py-12">
      <div className="container-custom max-w-4xl">
        {/* Back button */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 mb-8"
        >
          ← Kembali ke blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <h1 className="font-serif text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="mt-4 text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          
          <div className="mt-6 flex items-center text-sm text-gray-500">
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="mx-2">·</span>
            <span>{post.views} views</span>
          </div>
        </header>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="relative mb-12 h-96 overflow-hidden rounded-2xl">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose-custom">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Divider */}
        <hr className="my-12 border-gray-200" />

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
              Artikel Terkait
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  href={`/blog/${relatedPost.slug}`}
                  className="group block"
                >
                  <article>
                    {relatedPost.cover_image && (
                      <div className="relative h-40 overflow-hidden rounded-lg mb-3">
                        <Image
                          src={relatedPost.cover_image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
                                      }
