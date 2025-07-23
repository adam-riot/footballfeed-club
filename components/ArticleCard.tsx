import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, Tag } from 'lucide-react'
import { PostData } from '../lib/posts'

interface ArticleCardProps {
  post: PostData
  featured?: boolean
}

export default function ArticleCard({ post, featured = false }: ArticleCardProps) {
  const cardClasses = featured 
    ? "bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    : "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"

  const imageHeight = featured ? 300 : 200

  return (
    <article className={cardClasses}>
      <Link href={`/posts/${post.id}`}>
        <div className="relative">
          <Image
            src={post.featured_image || '/images/default-football.jpg'}
            alt={post.title}
            width={600}
            height={imageHeight}
            className="w-full object-cover"
            style={{ height: `${imageHeight}px` }}
          />
          <div className="absolute top-4 left-4">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              {post.category}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
        </div>

        <Link href={`/posts/${post.id}`}>
          <h2 className={`font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors ${
            featured ? 'text-2xl' : 'text-xl'
          }`}>
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="w-4 h-4 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <Link 
          href={`/posts/${post.id}`}
          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
        >
          Read More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}

