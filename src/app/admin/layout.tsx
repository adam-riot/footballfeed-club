import Link from 'next/link'
import { ReactNode } from 'react'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Football Feed Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Admin Panel</span>
              <Link 
                href="/"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-6">
            <div className="px-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Content Management
              </h3>
              <div className="mt-2 space-y-1">
                <Link
                  href="/admin"
                  className="bg-blue-50 text-blue-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  📊 Dashboard
                </Link>
                <Link
                  href="/admin/posts"
                  className="text-gray-700 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  📰 All Posts
                </Link>
                <Link
                  href="/admin/posts/new"
                  className="text-gray-700 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  ✏️ New Post
                </Link>
              </div>
            </div>

            <div className="px-4 mt-8">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Categories
              </h3>
              <div className="mt-2 space-y-1">
                <Link
                  href="/admin/news"
                  className="text-gray-700 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  📰 News
                </Link>
                <Link
                  href="/admin/transfers"
                  className="text-gray-700 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  🔄 Transfers
                </Link>
                <Link
                  href="/admin/matches"
                  className="text-gray-700 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  ⚽ Matches
                </Link>
                <Link
                  href="/admin/analysis"
                  className="text-gray-700 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  📊 Analysis
                </Link>
              </div>
            </div>

            <div className="px-4 mt-8">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Automation
              </h3>
              <div className="mt-2 space-y-1">
                <Link
                  href="/admin/automation"
                  className="text-gray-700 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  🤖 Automation Status
                </Link>
                <Link
                  href="/admin/webhooks"
                  className="text-gray-700 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  🔗 Webhook Logs
                </Link>
              </div>
            </div>

            <div className="px-4 mt-8">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Settings
              </h3>
              <div className="mt-2 space-y-1">
                <Link
                  href="/admin/language"
                  className="text-gray-700 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  🌐 Language Settings
                </Link>
                <Link
                  href="/admin/settings"
                  className="text-gray-700 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  ⚙️ General Settings
                </Link>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
