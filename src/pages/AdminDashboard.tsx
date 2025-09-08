import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, TrendingUp, MapPin, Activity, AlertTriangle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">MannMitra Admin Dashboard</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="wellness-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="wellness-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Sessions Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">Counseling bookings</p>
            </CardContent>
          </Card>
          
          <Card className="wellness-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Crisis Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">3</div>
              <p className="text-xs text-muted-foreground">Requiring immediate attention</p>
            </CardContent>
          </Card>
          
          <Card className="wellness-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">94.5%</div>
              <p className="text-xs text-muted-foreground">Based on user feedback</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle>District-wise Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Srinagar', 'Jammu', 'Baramulla', 'Anantnag', 'Kupwara'].map((district, i) => (
                  <div key={district} className="flex justify-between items-center">
                    <span>{district}</span>
                    <span className="font-semibold">{Math.floor(Math.random() * 300) + 100}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle>Top Concerns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Exam Stress', 'Career Anxiety', 'Sleep Issues', 'Family Pressure', 'Social Anxiety'].map((concern, i) => (
                  <div key={concern} className="flex justify-between items-center">
                    <span>{concern}</span>
                    <span className="text-muted-foreground">{Math.floor(Math.random() * 40) + 10}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;