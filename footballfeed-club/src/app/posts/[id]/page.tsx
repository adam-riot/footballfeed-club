import { getAllPostIds, getPostData } from '../../../../lib/posts'
import Image from 'next/image'
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PostPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths.map((path) => ({
    id: path.params.id
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const resolvedParams = await params
    const post = await getPostData(resolvedParams.id)

    return (
      <div>
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link 
            href="/"
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center space-x-2 mb-8">
                <Tag className="w-5 h-5 text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </header>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="mb-8">
              <Image
                src={post.featured_image}
                alt={post.title}
                width={800}
                height={400}
                className="w-full rounded-lg object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-green-600 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
          />

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-gray-500">
                Published on {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} by {post.author}
              </div>
              
              <div className="flex space-x-4">
                <button className="text-gray-500 hover:text-green-600 transition-colors">
                  Share on Twitter
                </button>
                <button className="text-gray-500 hover:text-green-600 transition-colors">
                  Share on Facebook
                </button>
              </div>
            </div>
          </footer>
        </article>

        {/* Related Articles Section */}
        <section className="bg-gray-50 py-12 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              More Football News
            </h2>
            <div className="text-center">
              <Link 
                href="/"
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Post not found:', error)
    notFound()
  }
}

