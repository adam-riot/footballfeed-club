import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Automation Status | Football Feed Admin',
  description: 'Monitor automated content creation and system status',
}

export default function AutomationStatus() {
  // In a real app, you would fetch this data from your database
  const automationStats = {
    totalWebhookCalls: 156,
    successfulPosts: 142,
    failedAttempts: 14,
    lastUpdate: new Date().toISOString(),
    todaysPosts: 8
  }

  const recentActivity = [
    {
      id: 1,
      type: 'news',
      title: 'Liverpool Signs New Midfielder',
      status: 'success',
      timestamp: '2025-01-15T10:30:00Z',
      source: 'Make.com RSS Feed'
    },
    {
      id: 2,
      type: 'transfer',
      title: 'Mbappe to Real Madrid - CONFIRMED',
      status: 'success',
      timestamp: '2025-01-15T09:15:00Z',
      source: 'Make.com Twitter Monitor'
    },
    {
      id: 3,
      type: 'match',
      title: 'Manchester United vs Arsenal Preview',
      status: 'success',
      timestamp: '2025-01-15T08:45:00Z',
      source: 'Make.com Football API'
    },
    {
      id: 4,
      type: 'viral',
      title: 'Ronaldo Amazing Goal Compilation',
      status: 'failed',
      timestamp: '2025-01-15T08:00:00Z',
      source: 'Make.com Social Media',
      error: 'Content validation failed'
    }
  ]

  const endpoints = [
    {
      name: 'General Webhook',
      url: '/api/webhook',
      status: 'active',
      lastCall: '2 minutes ago',
      totalCalls: 45,
      successRate: 98
    },
    {
      name: 'Match Data',
      url: '/api/matches',
      status: 'active',
      lastCall: '15 minutes ago',
      totalCalls: 23,
      successRate: 100
    },
    {
      name: 'Transfer News',
      url: '/api/transfers',
      status: 'active',
      lastCall: '1 hour ago',
      totalCalls: 67,
      successRate: 95
    },
    {
      name: 'Viral Content',
      url: '/api/viral',
      status: 'active',
      lastCall: '30 minutes ago',
      totalCalls: 21,
      successRate: 87
    }
  ]

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Automation Status</h1>
        <p className="text-gray-600 mt-2">
          Monitor your automated content creation and system health
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">🚀</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Webhook Calls</p>
              <p className="text-2xl font-bold text-gray-900">{automationStats.totalWebhookCalls}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Successful Posts</p>
              <p className="text-2xl font-bold text-gray-900">{automationStats.successfulPosts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <span className="text-2xl">❌</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Failed Attempts</p>
              <p className="text-2xl font-bold text-gray-900">{automationStats.failedAttempts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today&apos;s Posts</p>
              <p className="text-2xl font-bold text-gray-900">{automationStats.todaysPosts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Endpoint Status */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Endpoint Status</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {endpoints.map((endpoint, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    endpoint.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{endpoint.name}</p>
                    <p className="text-sm text-gray-500">{endpoint.url}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Last call: {endpoint.lastCall}</p>
                  <p className="text-sm text-gray-500">
                    {endpoint.totalCalls} calls • {endpoint.successRate}% success
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {activity.status === 'success' ? '✅' : '❌'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {activity.type}
                      </span>
                      <span>{activity.source}</span>
                      <span>{new Date(activity.timestamp).toLocaleString()}</span>
                    </div>
                    {activity.error && (
                      <p className="text-sm text-red-600 mt-1">Error: {activity.error}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'success' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All Activity
            </button>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API Response Time</span>
              <span className="text-green-600 font-medium">&lt; 200ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Success Rate (24h)</span>
              <span className="text-green-600 font-medium">96.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Active Scenarios</span>
              <span className="text-blue-600 font-medium">4/4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Restart</span>
              <span className="text-gray-600">2 days ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <span className="text-blue-600 font-medium">🔄 Test All Webhooks</span>
            </button>
            <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <span className="text-green-600 font-medium">📊 View Analytics</span>
            </button>
            <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <span className="text-purple-600 font-medium">⚙️ Configure Scenarios</span>
            </button>
            <button className="w-full text-left p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
              <span className="text-yellow-600 font-medium">📝 View Logs</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
