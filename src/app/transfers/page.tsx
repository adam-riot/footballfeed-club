import { getAllPosts } from '../../../lib/posts'
import ArticleCard from '../../../components/ArticleCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Transfer News | Football Feed Club',
  description: 'Latest football transfer news, rumors, and confirmed deals',
}

export default async function TransfersPage() {
  const posts = await getAllPosts()
  const transferPosts = posts.filter(post => 
    post.category === 'transfers' || 
    post.tags?.includes('transfer') ||
    post.tags?.includes('transfers')
  )

  // Group transfers by status
  const confirmedTransfers = transferPosts.filter(post => 
    post.tags?.includes('confirmed') || post.tags?.includes('completed')
  )
  const rumors = transferPosts.filter(post => 
    post.tags?.includes('rumor') || post.tags?.includes('rumors')
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Transfer Centre
          </h1>
          <p className="text-lg text-gray-600">
            All the latest transfer news, rumors, and confirmed deals
          </p>
        </div>

        {/* Transfer Status Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
          <button className="flex-1 py-2 px-4 rounded-md text-sm font-medium bg-white text-gray-900 shadow-sm">
            All Transfers
          </button>
          <button className="flex-1 py-2 px-4 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900">
            Confirmed
          </button>
          <button className="flex-1 py-2 px-4 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900">
            Rumors
          </button>
        </div>

        {/* Confirmed Transfers Section */}
        {confirmedTransfers.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full mr-3">
                ✓ CONFIRMED
              </span>
              Recent Confirmed Transfers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {confirmedTransfers.slice(0, 6).map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Transfer Rumors Section */}
        {rumors.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-yellow-500 text-white text-sm px-3 py-1 rounded-full mr-3">
                🔍 RUMORS
              </span>
              Latest Transfer Rumors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rumors.slice(0, 6).map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* All Transfers */}
        {transferPosts.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              All Transfer News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {transferPosts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No transfer news yet
            </h3>
            <p className="text-gray-500">
              Transfer updates will appear here when available
            </p>
          </div>
        )}

        {/* Load More Button */}
        {transferPosts.length > 9 && (
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Load More Transfers
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
