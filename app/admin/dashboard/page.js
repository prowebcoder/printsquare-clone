// printsquare-clone/app/admin/dashboard/page.js
'use client';
import { useEffect, useState } from 'react';
import { Users, FileText, Image as ImageIcon, Eye, TrendingUp, Activity, Calendar } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    pages: 0,
    media: 0,
    pageViews: 0
  });
  const [pages, setPages] = useState([]); // Add pages state
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRecentPages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/pages?limit=3', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setPages(data);
      }
    } catch (error) {
      console.error('Error fetching recent pages:', error);
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchStats(), fetchRecentPages()]);
        
        // Mock recent activity for now
        setRecentActivity([
          { id: 1, action: 'Page created', target: 'About Us', user: 'Admin', time: '2 hours ago', type: 'create' },
          { id: 2, action: 'Media uploaded', target: 'banner.jpg', user: 'Admin', time: '4 hours ago', type: 'upload' },
          { id: 3, action: 'Page updated', target: 'Homepage', user: 'Admin', time: '1 day ago', type: 'update' },
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { 
      title: 'Total Users', 
      value: stats.users, 
      icon: Users, 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br',
      trend: '+12%'
    },
    { 
      title: 'Total Pages', 
      value: stats.pages, 
      icon: FileText, 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-gradient-to-br',
      trend: '+5%'
    },
    { 
      title: 'Media Files', 
      value: stats.media, 
      icon: ImageIcon, 
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br',
      trend: '+23%'
    },
    { 
      title: 'Page Views', 
      value: stats.pageViews, 
      icon: Eye, 
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-gradient-to-br',
      trend: '+8%'
    },
  ];

  const quickActions = [
    { title: 'Create Page', description: 'Build a new page', icon: FileText, href: '/admin/dashboard/pages/new', color: 'text-blue-600 bg-blue-50' },
    { title: 'Upload Media', description: 'Add images or files', icon: ImageIcon, href: '/admin/dashboard/media', color: 'text-purple-600 bg-purple-50' },
    { title: 'Manage Users', description: 'View all users', icon: Users, href: '/admin/dashboard/users', color: 'text-green-600 bg-green-50' },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'create': return <FileText size={16} className="text-green-500" />;
      case 'upload': return <ImageIcon size={16} className="text-blue-500" />;
      case 'update': return <Activity size={16} className="text-orange-500" />;
      default: return <Activity size={16} className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-2">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening with your site.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2 sm:mt-0">
          <Calendar size={16} />
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp size={14} className="text-green-500 mr-1" />
                  <span className="text-xs text-green-600 font-medium">{card.trend}</span>
                  <span className="text-xs text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-2xl ${card.bgColor} ${card.color} text-white shadow-lg`}>
                <card.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Activity size={20} className="mr-2 text-indigo-600" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action) => (
                <a
                  key={action.title}
                  href={action.href}
                  className="block p-4 border-2 border-gray-100 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <action.icon size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Recent Pages */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Pages</h2>
            <div className="space-y-3">
              {pages && pages.length > 0 ? (
                pages.slice(0, 3).map((page) => (
                  <div key={page._id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <FileText size={16} className="text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-800">{page.title}</p>
                        <p className="text-sm text-gray-500">/{page.slug}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      page.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {page.published ? 'Live' : 'Draft'}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <FileText size={32} className="mx-auto mb-2 text-gray-300" />
                  <p>No pages created yet</p>
                  <Link
    href="/admin/dashboard/pages/new"
    className="text-indigo-600 hover:text-indigo-800 text-sm"
  >
    Create your first page
  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">
                      {activity.action} · <span className="text-gray-600">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      By {activity.user} · {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="font-semibold text-lg mb-2">System Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-indigo-100">Storage</span>
                <span className="font-semibold">2.4 GB / 10 GB</span>
              </div>
              <div className="w-full bg-indigo-500 rounded-full h-2">
                <div className="bg-white h-2 rounded-full w-1/4"></div>
              </div>
              <div className="flex justify-between items-center text-sm text-indigo-200">
                <span>All systems operational</span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}