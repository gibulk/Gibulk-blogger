import { createServerClientInstance } from '@/lib/supabase/server'
import BlogCard from '@/components/BlogCard'
import { Post } from '@/lib/supabase/types'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60 // ISR revalidate setiap 60 detik

export default async function Home() {
  const supabase = await createServerClientInstance()
  
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(10)

  const recentPosts = posts?.slice(0, 6) || []
  const featuredPost = recentPosts[0]

  return (
    <div>
      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Gibulk
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Selamat datang di ruang digital saya. Di sini saya berbagi pemikiran, 
              pengalaman, dan pembelajaran seputar teknologi, produktivitas, dan kehidupan.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="container-custom">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">
              Artikel Pilihan
            </h2>
            <Link href={`/blog/${featuredPost.slug}`} className="group">
              <article className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                {featuredPost.cover_image && (
                  <div className="relative h-64 overflow-hidden rounded-2xl lg:h-auto">
                    <Image
                      src={featuredPost.cover_image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="mt-4 text-gray-600 line-clamp-3">
                    {featuredPost.excerpt || featuredPost.content.replace(/<[^>]*>/g, '').slice(0, 200)}...
                  </p>
                  <div className="mt-6 flex items-center text-sm text-gray-500">
                    <time dateTime={featuredPost.created_at}>
                      {new Date(featuredPost.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span className="mx-2">·</span>
                    <span>{featuredPost.views} views</span>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Recent Posts Grid */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">
            Artikel Terbaru
          </h2>
          
          {recentPosts.length > 1 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.slice(1).map((post: Post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                Belum ada artikel. Segera hadir!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
                      }
