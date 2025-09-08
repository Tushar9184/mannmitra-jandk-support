import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Calendar, BookOpen, Users, Activity, User, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMood } from '@/contexts/MoodContext';

const navItems = [
  { name: 'Home', path: '/', icon: Brain },
  { name: 'Booking', path: '/booking', icon: Calendar },
  { name: 'Resources', path: '/resources', icon: BookOpen },
  { name: 'Community', path: '/community', icon: Users },
  { name: 'Wellness', path: '/wellness', icon: Activity },
  { name: 'Profile', path: '/profile', icon: User },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { currentMood } = useMood();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <nav className="wellness-card sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/admin" className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">MannMitra Admin</span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="wellness-card sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-primary">MannMitra</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-smooth ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin">Admin</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};