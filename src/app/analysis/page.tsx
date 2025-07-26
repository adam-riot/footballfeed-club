import { getAllPosts } from '../../../lib/posts'
import ArticleCard from '../../../components/ArticleCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Football Analysis | Football Feed Club',
  description: 'In-depth football analysis, tactical breakdowns, and expert opinions',
}

export default async function AnalysisPage() {
  const posts = await getAllPosts()
  const analysisPosts = posts.filter(post => 
    post.category === 'analysis' || 
    post.tags?.includes('analysis') ||
    post.tags?.includes('tactical') ||
    post.tags?.includes('opinion') ||
    post.tags?.includes('expert')
  )

  // Group analysis by type
  const tactical = analysisPosts.filter(post => 
    post.tags?.includes('tactical') || post.title.toLowerCase().includes('tactical')
  )
  const opinion = analysisPosts.filter(post => 
    post.tags?.includes('opinion') || post.title.toLowerCase().includes('opinion')
  )
  const playerAnalysis = analysisPosts.filter(post => 
    post.tags?.includes('player') && post.tags?.includes('analysis')
  )
  const teamAnalysis = analysisPosts.filter(post => 
    post.tags?.includes('team') && post.tags?.includes('analysis')
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Football Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Expert analysis, tactical breakdowns, and in-depth football insights
          </p>
        </div>

        {/* Analysis Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl mb-2">🧠</div>
            <div className="font-semibold text-blue-900">Tactical</div>
            <div className="text-sm text-blue-600">{tactical.length} articles</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl mb-2">💭</div>
            <div className="font-semibold text-green-900">Opinion</div>
            <div className="text-sm text-green-600">{opinion.length} articles</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl mb-2">👤</div>
            <div className="font-semibold text-purple-900">Players</div>
            <div className="text-sm text-purple-600">{playerAnalysis.length} articles</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl mb-2">⚽</div>
            <div className="font-semibold text-orange-900">Teams</div>
            <div className="text-sm text-orange-600">{teamAnalysis.length} articles</div>
          </div>
        </div>

        {/* Featured Analysis */}
        {analysisPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Featured Analysis
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {analysisPosts.slice(0, 2).map((post) => (
                <ArticleCard key={post.id} post={post} featured={true} />
              ))}
            </div>
          </div>
        )}

        {/* Tactical Analysis Section */}
        {tactical.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full mr-3">
                🧠 TACTICAL
              </span>
              Tactical Breakdowns
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tactical.slice(0, 6).map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Player Analysis Section */}
        {playerAnalysis.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-purple-600 text-white text-sm px-3 py-1 rounded-full mr-3">
                👤 PLAYERS
              </span>
              Player Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playerAnalysis.slice(0, 6).map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Opinion Section */}
        {opinion.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-green-600 text-white text-white text-sm px-3 py-1 rounded-full mr-3">
                💭 OPINION
              </span>
              Expert Opinions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opinion.slice(0, 6).map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* All Analysis */}
        {analysisPosts.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              All Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analysisPosts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No analysis articles yet
            </h3>
            <p className="text-gray-500">
              Expert analysis and tactical breakdowns will appear here when available
            </p>
          </div>
        )}

        {/* Load More Button */}
        {analysisPosts.length > 12 && (
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Load More Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
