import { getAllPosts } from '../../../lib/posts'
import ArticleCard from '../../../components/ArticleCard'

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">All Articles</h1>
      {posts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No posts available yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}
