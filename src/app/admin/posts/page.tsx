'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface PostData {
  id: string
  title: string
  date: string
  category?: string
  author?: string
  excerpt?: string
  tags?: string[]
  filename: string
}

export default function ManagePosts() {
  const [posts, setPosts] = useState<PostData[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [deletedPosts, setDeletedPosts] = useState<string[]>([])

  useEffect(() => {
    // Load deleted posts from localStorage
    const saved = localStorage.getItem('deleted-posts')
    if (saved) {
      setDeletedPosts(JSON.parse(saved))
    }
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts/list')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (filename: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return
    }

    setDeleting(filename)
    
    // Client-side delete (immediate effect)
    const newDeletedPosts = [...deletedPosts, filename]
    setDeletedPosts(newDeletedPosts)
    localStorage.setItem('deleted-posts', JSON.stringify(newDeletedPosts))
    setPosts(posts.filter(post => post.filename !== filename))
    
    try {
      // Try server-side delete as backup
      const response = await fetch(`/api/posts/delete?filename=${encodeURIComponent(filename)}`, {
        method: 'DELETE'
      })

      let data = await response.json()

      // If hard delete fails, try soft delete
      if (!response.ok && data.error?.includes('production environment')) {
        const softResponse = await fetch('/api/posts/soft-delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ filename, title })
        })
        data = await softResponse.json()
      }

      if (response.ok) {
        alert('Post deleted successfully on server!')
      } else {
        // Server delete failed, but client-side delete already worked
        alert(`Post removed from view (client-side). Server message: ${data.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error with server delete:', error)
      alert('Post removed from view. Server sync may be unavailable.')
    } finally {
      setDeleting(null)
    }
  }

  // Filter posts client-side to exclude deleted ones
  const visiblePosts = posts.filter(post => !deletedPosts.includes(post.filename))

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Posts</h1>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Posts</h1>
          <p className="text-gray-600 mt-2">View and manage all your football content</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Post
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="text-2xl font-bold text-gray-900">{visiblePosts.length}</div>
        <div className="text-sm text-gray-600">Visible Posts</div>
      </div>

      <div className="grid gap-4">
        {visiblePosts.map((post) => (
          <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {post.category || 'General'}
                  </span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>by {post.author}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">File: {post.filename}</div>
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                <Link
                  href={`/posts/${post.id}`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium text-center"
                >
                  View
                </Link>
                <button
                  onClick={() => handleDelete(post.filename, post.title)}
                  disabled={deleting === post.filename}
                  className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50"
                >
                  {deleting === post.filename ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visiblePosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first post</p>
          <Link
            href="/admin/posts/new"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create New Post
          </Link>
        </div>
      )}
    </div>
  )
}
