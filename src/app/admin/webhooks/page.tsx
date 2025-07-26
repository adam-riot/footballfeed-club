import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Webhook Logs | Football Feed Admin',
  description: 'Monitor webhook activity and debugging logs',
}

export default function WebhookLogs() {
  // In a real app, you would fetch this from your database/logs
  const webhookLogs = [
    {
      id: 1,
      endpoint: '/api/webhook',
      method: 'POST',
      status: 200,
      timestamp: '2025-01-15T14:30:22Z',
      source: 'Make.com RSS Feed',
      payload: {
        title: 'Liverpool Signs New Striker',
        category: 'news'
      },
      response_time: 145,
      created_post: 'liverpool-signs-new-striker'
    },
    {
      id: 2,
      endpoint: '/api/transfers',
      method: 'POST',
      status: 200,
      timestamp: '2025-01-15T13:15:11Z',
      source: 'Make.com Twitter Monitor',
      payload: {
        player: 'Kylian Mbappe',
        to_club: 'Real Madrid',
        status: 'confirmed'
      },
      response_time: 89,
      created_post: 'mbappe-real-madrid-confirmed'
    },
    {
      id: 3,
      endpoint: '/api/viral',
      method: 'POST',
      status: 400,
      timestamp: '2025-01-15T12:45:33Z',
      source: 'Make.com Social Media',
      payload: {
        title: 'Amazing Goal',
        engagement_score: 45
      },
      response_time: 23,
      error: 'Engagement score below threshold (70)'
    },
    {
      id: 4,
      endpoint: '/api/matches',
      method: 'POST',
      status: 200,
      timestamp: '2025-01-15T11:20:45Z',
      source: 'Make.com Football API',
      payload: {
        home_team: 'Manchester United',
        away_team: 'Arsenal',
        status: 'scheduled'
      },
      response_time: 167,
      created_post: 'man-utd-vs-arsenal-preview'
    },
    {
      id: 5,
      endpoint: '/api/webhook',
      method: 'POST',
      status: 500,
      timestamp: '2025-01-15T10:15:22Z',
      source: 'Make.com RSS Feed',
      payload: {
        title: '',
        content: null
      },
      response_time: 1200,
      error: 'Missing required fields: title, content'
    }
  ]

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'bg-green-100 text-green-800'
    if (status >= 400 && status < 500) return 'bg-yellow-100 text-yellow-800'
    if (status >= 500) return 'bg-red-100 text-red-800'
    return 'bg-gray-100 text-gray-800'
  }

  const getEndpointColor = (endpoint: string) => {
    if (endpoint.includes('webhook')) return 'bg-blue-100 text-blue-800'
    if (endpoint.includes('transfers')) return 'bg-yellow-100 text-yellow-800'
    if (endpoint.includes('matches')) return 'bg-green-100 text-green-800'
    if (endpoint.includes('viral')) return 'bg-purple-100 text-purple-800'
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Webhook Logs</h1>
        <p className="text-gray-600 mt-2">
          Monitor webhook activity, debug issues, and track automation performance
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">📞</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Calls (24h)</p>
              <p className="text-2xl font-bold text-gray-900">{webhookLogs.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Successful</p>
              <p className="text-2xl font-bold text-gray-900">
                {webhookLogs.filter(log => log.status >= 200 && log.status < 300).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <span className="text-2xl">❌</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-gray-900">
                {webhookLogs.filter(log => log.status >= 400).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">⚡</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Response</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(webhookLogs.reduce((acc, log) => acc + log.response_time, 0) / webhookLogs.length)}ms
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
            <option>All Endpoints</option>
            <option>/api/webhook</option>
            <option>/api/transfers</option>
            <option>/api/matches</option>
            <option>/api/viral</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
            <option>All Status</option>
            <option>Success (2xx)</option>
            <option>Client Error (4xx)</option>
            <option>Server Error (5xx)</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-700">
            Apply Filters
          </button>
        </div>
      </div>

      {/* Webhook Logs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Webhook Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Endpoint
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Response Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Result
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {webhookLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getEndpointColor(log.endpoint)}`}>
                      {log.endpoint}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.response_time}ms
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {log.created_post ? (
                      <span className="text-green-600">
                        ✓ Created: {log.created_post}
                      </span>
                    ) : log.error ? (
                      <span className="text-red-600">
                        ✗ {log.error}
                      </span>
                    ) : (
                      <span className="text-gray-500">Processing...</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payload Details Modal Trigger */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 mb-4">
          Click on any row to view detailed payload and response information
        </p>
        <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
          Export Logs (CSV)
        </button>
      </div>
    </div>
  )
}
