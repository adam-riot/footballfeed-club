import { getAllPosts } from '../../../../lib/posts'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News Management | Football Feed Admin',
  description: 'Manage news articles and content',
}

export default async function AdminNews() {
  const posts = await getAllPosts()
  const newsPosts = posts.filter(p => 
    p.category === 'news' || p.tags?.includes('news') || !p.category
  )

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
          <p className="text-gray-600 mt-2">
            Manage all news articles and general football content
          </p>
        </div>
        <Link
          href="/admin/posts/new?category=news"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create News Article
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">📰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total News</p>
              <p className="text-2xl font-bold text-gray-900">{newsPosts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">📅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">
                {newsPosts.filter(p => {
                  const postDate = new Date(p.date)
                  const weekAgo = new Date()
                  weekAgo.setDate(weekAgo.getDate() - 7)
                  return postDate > weekAgo
                }).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">🔥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Popular Tags</p>
              <p className="text-sm text-gray-700">
                {Array.from(new Set(newsPosts.flatMap(p => p.tags || []))).slice(0, 3).join(', ') || 'None'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* News Articles List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All News Articles</h3>
        </div>
        <div className="p-6">
          {newsPosts.length > 0 ? (
            <div className="space-y-4">
              {newsPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{post.title}</h4>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span>by {post.author}</span>
                      {post.tags && (
                        <div className="flex space-x-1">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="bg-gray-100 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Link
                      href={`/posts/${post.id}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">📰</span>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No news articles yet
              </h3>
              <p className="text-gray-500 mb-6">
                Create your first news article to get started
              </p>
              <Link
                href="/admin/posts/new?category=news"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create News Article
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
