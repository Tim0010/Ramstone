import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import {
  Users,
  Car,
  Package,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  Calendar,
  TrendingUp,
  Mail,
  Phone,
  FileText,
  Receipt
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Inquiries',
      value: '127',
      change: '+12%',
      icon: MessageSquare,
      color: 'text-blue-600'
    },
    {
      title: 'Auto Repair Jobs',
      value: '89',
      change: '+8%',
      icon: Car,
      color: 'text-green-600'
    },
    {
      title: 'Supply Orders',
      value: '156',
      change: '+15%',
      icon: Package,
      color: 'text-purple-600'
    },
    {
      title: 'Monthly Revenue',
      value: 'K45,200',
      change: '+23%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'inquiry',
      message: 'New auto repair inquiry from John Mwanza',
      time: '2 hours ago',
      icon: Car
    },
    {
      id: 2,
      type: 'order',
      message: 'Supply order completed for Lusaka Construction',
      time: '4 hours ago',
      icon: Package
    },
    {
      id: 3,
      type: 'contact',
      message: 'WhatsApp message from +260 977 123 456',
      time: '6 hours ago',
      icon: MessageSquare
    },
    {
      id: 4,
      type: 'phone',
      message: 'Phone inquiry about panel beating services',
      time: '1 day ago',
      icon: Phone
    }
  ];

  const quickActions = [
    {
      title: 'Quotation Generation',
      description: 'Create quotes for customers',
      icon: FileText,
      action: () => navigate('/admin/quotation-generator')
    },
    {
      title: 'Invoice Generation',
      description: 'Generate invoices for services',
      icon: Receipt,
      action: () => navigate('/admin/invoice-generator')
    },
    {
      title: 'Generate Reports',
      description: 'Create business reports',
      icon: BarChart3,
      action: () => console.log('Generate reports')
    },
    {
      title: 'Customer Database',
      description: 'Manage customer information',
      icon: Users,
      action: () => console.log('Customer database')
    }
  ];

  return (
    <>
      <SEO 
        title="Admin Dashboard - Ramstone Creative Solutions"
        description="Admin dashboard for managing Ramstone Creative Solutions business operations"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                  <p className="text-sm text-gray-500">Welcome back, {user?.username}</p>
                </div>
              </div>
              <Button 
                onClick={logout} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change} from last month</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <activity.icon className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-start gap-2"
                      onClick={action.action}
                    >
                      <action.icon className="w-5 h-5 text-primary" />
                      <div className="text-left">
                        <p className="font-medium">{action.title}</p>
                        <p className="text-xs text-gray-500">{action.description}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
