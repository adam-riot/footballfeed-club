import { getAllPosts } from '../../../lib/posts'
import ArticleCard from '../../../components/ArticleCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Match Centre | Football Feed Club',
  description: 'Match previews, reports, and analysis',
}

export default async function MatchesPage() {
  const posts = await getAllPosts()
  const matchPosts = posts.filter(post => 
    post.category === 'matches' || 
    post.tags?.includes('match') ||
    post.tags?.includes('preview') ||
    post.tags?.includes('report') ||
    post.tags?.includes('analysis')
  )

  // Group matches by type
  const previews = matchPosts.filter(post => 
    post.tags?.includes('preview') || post.title.toLowerCase().includes('preview')
  )
  const reports = matchPosts.filter(post => 
    post.tags?.includes('report') || post.title.toLowerCase().includes('report')
  )
  const analysis = matchPosts.filter(post => 
    post.tags?.includes('analysis') || post.title.toLowerCase().includes('analysis')
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Match Centre
          </h1>
          <p className="text-lg text-gray-600">
            Match previews, reports, and tactical analysis
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {previews.length}
            </div>
            <div className="text-blue-700 font-medium">Match Previews</div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {reports.length}
            </div>
            <div className="text-green-700 font-medium">Match Reports</div>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {analysis.length}
            </div>
            <div className="text-purple-700 font-medium">Analysis Articles</div>
          </div>
        </div>

        {/* Match Previews Section */}
        {previews.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full mr-3">
                📅 PREVIEWS
              </span>
              Upcoming Matches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {previews.slice(0, 6).map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Match Reports Section */}
        {reports.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full mr-3">
                📝 REPORTS
              </span>
              Match Reports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.slice(0, 6).map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Analysis Section */}
        {analysis.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-purple-600 text-white text-sm px-3 py-1 rounded-full mr-3">
                🔍 ANALYSIS
              </span>
              Tactical Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analysis.slice(0, 6).map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* All Match Content */}
        {matchPosts.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              All Match Content
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchPosts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚽</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No match content yet
            </h3>
            <p className="text-gray-500">
              Match previews and reports will appear here when available
            </p>
          </div>
        )}

        {/* Load More Button */}
        {matchPosts.length > 12 && (
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Load More Content
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
