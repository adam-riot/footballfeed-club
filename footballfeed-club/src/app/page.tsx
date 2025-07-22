import { getAllPosts, getFeaturedPosts } from '../../lib/posts'
import ArticleCard from '../../components/ArticleCard'
import { TrendingUp, Clock, Users } from 'lucide-react'

export default async function Home() {
  const allPosts = await getAllPosts()
  const featuredPosts = await getFeaturedPosts(1)
  const latestPosts = allPosts.slice(0, 6)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Football Feed Club
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Your ultimate destination for the latest football news, transfer updates, 
              and in-depth analysis from around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-4 py-2">
                <TrendingUp className="w-5 h-5" />
                <span>Breaking News</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-4 py-2">
                <Clock className="w-5 h-5" />
                <span>Live Updates</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-4 py-2">
                <Users className="w-5 h-5" />
                <span>Expert Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPosts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Story</h2>
              <p className="text-gray-600">Don&apos;t miss our top story of the day</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <ArticleCard post={featuredPosts[0]} featured={true} />
            </div>
          </div>
        </section>
      )}

      {/* Latest News */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest News</h2>
            <p className="text-gray-600">Stay updated with the freshest football stories</p>
          </div>

          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚽</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to Football Feed Club!
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Your automated football content system is ready to go. 
                Connect your automation workflows to start generating amazing football content automatically.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
                <h4 className="font-semibold text-blue-900 mb-2">Next Steps:</h4>
                <ul className="text-left text-blue-800 space-y-1">
                  <li>• Connect your Make.com automation workflows</li>
                  <li>• Configure your football news sources</li>
                  <li>• Set up your content generation triggers</li>
                  <li>• Start generating automated football content</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss a Goal</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest football news delivered straight to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

