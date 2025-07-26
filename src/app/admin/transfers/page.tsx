import { getAllPosts } from '../../../../lib/posts'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Transfer Management | Football Feed Admin',
  description: 'Manage transfer news and rumors',
}

export default async function AdminTransfers() {
  const posts = await getAllPosts()
  const transferPosts = posts.filter(p => 
    p.category === 'transfers' || p.tags?.includes('transfer') || p.tags?.includes('transfers')
  )

  // Group by status
  const confirmedTransfers = transferPosts.filter(p => 
    p.tags?.includes('confirmed') || p.tags?.includes('completed')
  )
  const rumors = transferPosts.filter(p => 
    p.tags?.includes('rumor') || p.tags?.includes('rumors')
  )

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transfer Management</h1>
          <p className="text-gray-600 mt-2">
            Manage transfer news, rumors, and confirmed deals
          </p>
        </div>
        <Link
          href="/admin/posts/new?category=transfers"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Transfer News
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">🔄</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Transfers</p>
              <p className="text-2xl font-bold text-gray-900">{transferPosts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-gray-900">{confirmedTransfers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-2xl">🔍</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rumors</p>
              <p className="text-2xl font-bold text-gray-900">{rumors.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">📅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">
                {transferPosts.filter(p => {
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

      {/* Transfer Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Confirmed Transfers */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full mr-3">
                ✅ CONFIRMED
              </span>
              Confirmed Transfers
            </h3>
          </div>
          <div className="p-6">
            {confirmedTransfers.length > 0 ? (
              <div className="space-y-3">
                {confirmedTransfers.slice(0, 5).map((post) => (
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
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No confirmed transfers yet</p>
            )}
          </div>
        </div>

        {/* Transfer Rumors */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="bg-yellow-500 text-white text-sm px-3 py-1 rounded-full mr-3">
                🔍 RUMORS
              </span>
              Transfer Rumors
            </h3>
          </div>
          <div className="p-6">
            {rumors.length > 0 ? (
              <div className="space-y-3">
                {rumors.slice(0, 5).map((post) => (
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
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No transfer rumors yet</p>
            )}
          </div>
        </div>
      </div>

      {/* All Transfers */}
      <div className="bg-white rounded-lg shadow mt-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Transfer News</h3>
        </div>
        <div className="p-6">
          {transferPosts.length > 0 ? (
            <div className="space-y-4">
              {transferPosts.map((post) => (
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
                              tag === 'confirmed' || tag === 'completed' ? 'bg-green-100 text-green-800' :
                              tag === 'rumor' || tag === 'rumors' ? 'bg-yellow-100 text-yellow-800' :
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
              <span className="text-6xl mb-4 block">🔄</span>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No transfer news yet
              </h3>
              <p className="text-gray-500 mb-6">
                Add your first transfer news or rumor
              </p>
              <Link
                href="/admin/posts/new?category=transfers"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Transfer News
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
