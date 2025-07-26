import { getAllPosts, PostData } from '../../../../lib/posts'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Manage Posts | Football Feed Admin',
  description: 'View, edit, and manage all football posts',
}

export default async function ManagePosts() {
  const posts = await getAllPosts()

  // Group posts by category
  const categorizedPosts = {
    news: posts.filter(p => p.category === 'news' || p.tags?.includes('news')),
    transfers: posts.filter(p => p.category === 'transfers' || p.tags?.includes('transfer')),
    matches: posts.filter(p => p.category === 'matches' || p.tags?.includes('match')),
    analysis: posts.filter(p => p.category === 'analysis' || p.tags?.includes('analysis')),
    other: posts.filter(p => !['news', 'transfers', 'matches', 'analysis'].includes(p.category || ''))
  }

  const PostCard = ({ post }: { post: PostData }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span className="bg-gray-100 px-2 py-1 rounded">
              {post.category || 'General'}
            </span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span>by {post.author}</span>
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
    </div>
  )

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Posts</h1>
          <p className="text-gray-600 mt-2">
            View, edit, and manage all your football content
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Post
        </Link>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
          <div className="text-sm text-gray-600">Total Posts</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-2xl font-bold text-blue-600">{categorizedPosts.news.length}</div>
          <div className="text-sm text-gray-600">News</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-2xl font-bold text-yellow-600">{categorizedPosts.transfers.length}</div>
          <div className="text-sm text-gray-600">Transfers</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-2xl font-bold text-green-600">{categorizedPosts.matches.length}</div>
          <div className="text-sm text-gray-600">Matches</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-2xl font-bold text-purple-600">{categorizedPosts.analysis.length}</div>
          <div className="text-sm text-gray-600">Analysis</div>
        </div>
      </div>

      {/* Posts by Category */}
      {Object.entries(categorizedPosts).map(([category, categoryPosts]) => {
        if (categoryPosts.length === 0) return null
        
        const categoryNames = {
          news: 'News Articles',
          transfers: 'Transfer News',
          matches: 'Match Content',
          analysis: 'Analysis Articles',
          other: 'Other Posts'
        }

        const categoryIcons = {
          news: '📰',
          transfers: '🔄',
          matches: '⚽',
          analysis: '📊',
          other: '📝'
        }

        return (
          <div key={category} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <span className="mr-2 text-2xl">
                  {categoryIcons[category as keyof typeof categoryIcons]}
                </span>
                {categoryNames[category as keyof typeof categoryNames]} ({categoryPosts.length})
              </h2>
              <Link
                href={`/admin/${category}`}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All {categoryNames[category as keyof typeof categoryNames]}
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {categoryPosts.slice(0, 4).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            
            {categoryPosts.length > 4 && (
              <div className="text-center mt-4">
                <Link
                  href={`/admin/${category}`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View {categoryPosts.length - 4} more {category} posts...
                </Link>
              </div>
            )}
          </div>
        )
      })}

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">📝</span>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No posts yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first football article to get started
          </p>
          <Link
            href="/admin/posts/new"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Post
          </Link>
        </div>
      )}
    </div>
  )
}
