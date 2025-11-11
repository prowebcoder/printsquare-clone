'use client';
import { useEffect, useState } from 'react';
import { Users, FileText, Image as ImageIcon, Eye } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    pages: 0,
    media: 0,
    pageViews: 0
  });
  const [loading, setLoading] = useState(true);

  // define fetchStats before useEffect
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Users', value: stats.users, icon: Users, color: 'bg-blue-500' },
    { title: 'Total Pages', value: stats.pages, icon: FileText, color: 'bg-green-500' },
    { title: 'Media Files', value: stats.media, icon: ImageIcon, color: 'bg-purple-500' },
    { title: 'Page Views', value: stats.pageViews, icon: Eye, color: 'bg-orange-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <div key={card.title} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${card.color} text-white mr-4`}>
                <card.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.href = '/admin/dashboard/pages/new'}
              className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Create New Page
            </button>
            <button 
              onClick={() => window.location.href = '/admin/dashboard/media'}
              className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Manage Media
            </button>
            <button 
              onClick={() => window.location.href = '/admin/dashboard/users'}
              className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Users
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="text-gray-500 text-center py-8">
            <p>No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  );
}
