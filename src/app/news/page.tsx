import { getAllPosts } from '../../../lib/posts'
import ArticleCard from '../../../components/ArticleCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Football News | Football Feed Club',
  description: 'Latest football news, updates, and breaking stories',
}

export default async function NewsPage() {
  const posts = await getAllPosts()
  const newsPosts = posts.filter(post => 
    post.category === 'news' || 
    post.tags?.includes('news') ||
    !post.category // Default ke news jika tiada category
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Football News
          </h1>
          <p className="text-lg text-gray-600">
            Stay updated with the latest football news from around the world
          </p>
        </div>

        {/* News Grid */}
        {newsPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsPosts.map((post) => (
              <ArticleCard
                key={post.id}
                post={post}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No news articles yet
            </h3>
            <p className="text-gray-500">
              News articles will appear here when available
            </p>
          </div>
        )}

        {/* Load More Button */}
        {newsPosts.length > 6 && (
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Load More News
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
