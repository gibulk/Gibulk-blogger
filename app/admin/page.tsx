import { createAdminClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const supabase = await createAdminClient()
  
  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
  
  const { count: publishedPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('published', true)
  
  const { data: recentPosts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  const totalViews = recentPosts?.reduce((sum, post) => sum + (post.views || 0), 0) || 0

  return (
    <div className="container-custom py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          + New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Posts</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{totalPosts || 0}</p>
        </div>
        
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="text-sm font-medium text-gray-500">Published</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">{publishedPosts || 0}</p>
        </div>
        
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="text-sm font-medium text-gray-500">Draft</h3>
          <p className="mt-2 text-3xl font-bold text-gray-600">
            {(totalPosts || 0) - (publishedPosts || 0)}
          </p>
        </div>
        
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">{totalViews}</p>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="font-serif text-xl font-bold text-gray-900">Recent Posts</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {recentPosts?.map((post) => (
            <div key={post.id} className="flex items-center justify-between px-6 py-4">
              <div className="flex-1">
                <Link 
                  href={`/admin/posts/edit/${post.id}`}
                  className="font-medium text-gray-900 hover:text-blue-600"
                >
                  {post.title}
                </Link>
                <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  <span>{post.views} views</span>
                  {post.published ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                      Draft
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  View
                </Link>
                <Link
                  href={`/admin/posts/edit/${post.id}`}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {recentPosts?.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">No posts yet. Create your first post!</p>
          </div>
        )}
      </div>
    </div>
  )
}
