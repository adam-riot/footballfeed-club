import { getAllPosts } from '../../../lib/posts'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Football Feed Club',
  description: 'Admin panel for managing content and automation',
}

export default async function AdminDashboard() {
  const posts = await getAllPosts()
  
  // Calculate stats
  const totalPosts = posts.length
  const newsPosts = posts.filter(p => p.category === 'news' || p.tags?.includes('news')).length
  const transferPosts = posts.filter(p => p.category === 'transfers' || p.tags?.includes('transfer')).length
  const matchPosts = posts.filter(p => p.category === 'matches' || p.tags?.includes('match')).length

  // Recent posts (last 5)
  const recentPosts = posts.slice(0, 5)

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Overview of your football website content and automation status
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">📰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Posts</p>
              <p className="text-2xl font-bold text-gray-900">{totalPosts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">📄</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">News Articles</p>
              <p className="text-2xl font-bold text-gray-900">{newsPosts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-2xl">🔄</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Transfer News</p>
              <p className="text-2xl font-bold text-gray-900">{transferPosts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">⚽</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Match Content</p>
              <p className="text-2xl font-bold text-gray-900">{matchPosts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              href="/admin/posts/new"
              className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <span className="text-blue-600 mr-3">✏️</span>
              <div>
                <p className="font-medium text-blue-900">Create New Post</p>
                <p className="text-sm text-blue-600">Write a new article manually</p>
              </div>
            </Link>
            
            <Link
              href="/admin/automation"
              className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <span className="text-green-600 mr-3">🤖</span>
              <div>
                <p className="font-medium text-green-900">Check Automation</p>
                <p className="text-sm text-green-600">Monitor automated content creation</p>
              </div>
            </Link>

            <Link
              href="/admin/language"
              className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <span className="text-purple-600 mr-3">🌐</span>
              <div>
                <p className="font-medium text-purple-900">Language Settings</p>
                <p className="text-sm text-purple-600">Change site language</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Automation Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                <span className="font-medium">News Automation</span>
              </div>
              <span className="text-green-600 text-sm">Active</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                <span className="font-medium">Transfer Updates</span>
              </div>
              <span className="text-green-600 text-sm">Active</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                <span className="font-medium">Match Data</span>
              </div>
              <span className="text-green-600 text-sm">Active</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                <span className="font-medium">Viral Content</span>
              </div>
              <span className="text-green-600 text-sm">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Posts</h3>
            <Link
              href="/admin/posts"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="p-6">
          {recentPosts.length > 0 ? (
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{post.title}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">{post.category || 'General'}</span>
                      <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                      <span className="text-sm text-gray-500">by {post.author}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/posts/${post.id}`}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-green-600 hover:text-green-700 text-sm"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">📝</span>
              <p className="text-gray-500">No posts yet. Create your first post!</p>
              <Link
                href="/admin/posts/new"
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Create Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
