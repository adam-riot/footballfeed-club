import { getAllPosts } from '../../../../lib/posts'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Match Management | Football Feed Admin',
  description: 'Manage match content, previews, and reports',
}

export default async function AdminMatches() {
  const posts = await getAllPosts()
  const matchPosts = posts.filter(p => 
    p.category === 'matches' || 
    p.tags?.includes('match') ||
    p.tags?.includes('preview') ||
    p.tags?.includes('report')
  )

  // Group by type
  const previews = matchPosts.filter(p => 
    p.tags?.includes('preview') || p.title.toLowerCase().includes('preview')
  )
  const reports = matchPosts.filter(p => 
    p.tags?.includes('report') || p.title.toLowerCase().includes('report')
  )

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Match Management</h1>
          <p className="text-gray-600 mt-2">
            Manage match previews, reports, and analysis content
          </p>
        </div>
        <Link
          href="/admin/posts/new?category=matches"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Match Content
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">⚽</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Match Content</p>
              <p className="text-2xl font-bold text-gray-900">{matchPosts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">📅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Match Previews</p>
              <p className="text-2xl font-bold text-gray-900">{previews.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">📝</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Match Reports</p>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">
                {matchPosts.filter(p => {
                  const postDate = new Date(p.date)
                  const weekAgo = new Date()
                  weekAgo.setDate(weekAgo.getDate() - 7)
                  return postDate > weekAgo
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Match Content Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Match Previews */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full mr-3">
                📅 PREVIEWS
              </span>
              Match Previews
            </h3>
          </div>
          <div className="p-6">
            {previews.length > 0 ? (
              <div className="space-y-3">
                {previews.slice(0, 5).map((post) => (
                  <div key={post.id} className="p-3 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{post.title}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <div className="flex space-x-2">
                        <Link href={`/posts/${post.id}`} className="text-blue-600 text-xs">View</Link>
                        <Link href={`/admin/posts/${post.id}/edit`} className="text-green-600 text-xs">Edit</Link>
                      </div>
                    </div>
                  </div>
                ))}
                {previews.length > 5 && (
                  <p className="text-center text-sm text-gray-500 pt-2">
                    +{previews.length - 5} more previews
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No match previews yet</p>
            )}
          </div>
        </div>

        {/* Match Reports */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full mr-3">
                📝 REPORTS
              </span>
              Match Reports
            </h3>
          </div>
          <div className="p-6">
            {reports.length > 0 ? (
              <div className="space-y-3">
                {reports.slice(0, 5).map((post) => (
                  <div key={post.id} className="p-3 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{post.title}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <div className="flex space-x-2">
                        <Link href={`/posts/${post.id}`} className="text-blue-600 text-xs">View</Link>
                        <Link href={`/admin/posts/${post.id}/edit`} className="text-green-600 text-xs">Edit</Link>
                      </div>
                    </div>
                  </div>
                ))}
                {reports.length > 5 && (
                  <p className="text-center text-sm text-gray-500 pt-2">
                    +{reports.length - 5} more reports
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No match reports yet</p>
            )}
          </div>
        </div>
      </div>

      {/* All Match Content */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Match Content</h3>
        </div>
        <div className="p-6">
          {matchPosts.length > 0 ? (
            <div className="space-y-4">
              {matchPosts.map((post) => (
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
                            <span key={index} className={`px-2 py-1 rounded text-xs ${
                              tag === 'preview' ? 'bg-blue-100 text-blue-800' :
                              tag === 'report' ? 'bg-green-100 text-green-800' :
                              tag === 'analysis' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
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
              <span className="text-6xl mb-4 block">⚽</span>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No match content yet
              </h3>
              <p className="text-gray-500 mb-6">
                Create your first match preview or report
              </p>
              <Link
                href="/admin/posts/new?category=matches"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Match Content
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
