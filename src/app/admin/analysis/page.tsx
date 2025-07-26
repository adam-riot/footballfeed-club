import { getAllPosts } from '../../../../lib/posts'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analysis Management | Football Feed Admin',
  description: 'Manage analysis articles and tactical content',
}

export default async function AdminAnalysis() {
  const posts = await getAllPosts()
  const analysisPosts = posts.filter(p => 
    p.category === 'analysis' || 
    p.tags?.includes('analysis') ||
    p.tags?.includes('tactical') ||
    p.tags?.includes('opinion')
  )

  // Group by type
  const tactical = analysisPosts.filter(p => 
    p.tags?.includes('tactical') || p.title.toLowerCase().includes('tactical')
  )
  const opinion = analysisPosts.filter(p => 
    p.tags?.includes('opinion') || p.title.toLowerCase().includes('opinion')
  )
  const playerAnalysis = analysisPosts.filter(p => 
    p.tags?.includes('player') && p.tags?.includes('analysis')
  )

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analysis Management</h1>
          <p className="text-gray-600 mt-2">
            Manage analysis articles, tactical content, and expert opinions
          </p>
        </div>
        <Link
          href="/admin/posts/new?category=analysis"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Analysis
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Analysis</p>
              <p className="text-2xl font-bold text-gray-900">{analysisPosts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">🧠</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tactical Analysis</p>
              <p className="text-2xl font-bold text-gray-900">{tactical.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">💭</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Opinion Pieces</p>
              <p className="text-2xl font-bold text-gray-900">{opinion.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-2xl">👤</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Player Analysis</p>
              <p className="text-2xl font-bold text-gray-900">{playerAnalysis.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Tactical Analysis */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full mr-3">
                🧠 TACTICAL
              </span>
              Tactical Analysis
            </h3>
          </div>
          <div className="p-6">
            {tactical.length > 0 ? (
              <div className="space-y-3">
                {tactical.slice(0, 5).map((post) => (
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
                {tactical.length > 5 && (
                  <p className="text-center text-sm text-gray-500 pt-2">
                    +{tactical.length - 5} more tactical articles
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No tactical analysis yet</p>
            )}
          </div>
        </div>

        {/* Opinion Pieces */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full mr-3">
                💭 OPINION
              </span>
              Opinion Pieces
            </h3>
          </div>
          <div className="p-6">
            {opinion.length > 0 ? (
              <div className="space-y-3">
                {opinion.slice(0, 5).map((post) => (
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
                {opinion.length > 5 && (
                  <p className="text-center text-sm text-gray-500 pt-2">
                    +{opinion.length - 5} more opinion pieces
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No opinion pieces yet</p>
            )}
          </div>
        </div>
      </div>

      {/* All Analysis */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Analysis Articles</h3>
        </div>
        <div className="p-6">
          {analysisPosts.length > 0 ? (
            <div className="space-y-4">
              {analysisPosts.map((post) => (
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
                              tag === 'tactical' ? 'bg-blue-100 text-blue-800' :
                              tag === 'opinion' ? 'bg-green-100 text-green-800' :
                              tag === 'player' ? 'bg-purple-100 text-purple-800' :
                              tag === 'analysis' ? 'bg-orange-100 text-orange-800' :
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
              <span className="text-6xl mb-4 block">📊</span>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No analysis articles yet
              </h3>
              <p className="text-gray-500 mb-6">
                Create your first analysis or tactical breakdown
              </p>
              <Link
                href="/admin/posts/new?category=analysis"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Analysis
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
