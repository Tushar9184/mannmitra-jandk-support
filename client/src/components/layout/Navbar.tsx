import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Calendar, BookOpen, Users, Activity, User, BarChart3, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMood } from '@/contexts/MoodContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  const { user, logout } = useAuth();
  const isAdmin = location.pathname.startsWith('/admin');
  const [isOpen, setIsOpen] = useState(false);

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
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold hidden xs:block">MannMitra</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-smooth ${isActive
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
            {user ? (
              <Button variant="outline" size="sm" onClick={logout} className="hidden md:flex">
                Logout
              </Button>
            ) : (
              <Button variant="default" size="sm" asChild className="hidden md:flex">
                <Link to="/login">Login</Link>
              </Button>
            )}

            <Button variant="outline" size="sm" asChild className="hidden md:flex">
              <Link to="/admin">Admin</Link>
            </Button>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader className="mb-6">
                  <SheetTitle className="flex items-center space-x-2">
                    <Brain className="h-6 w-6 text-primary" />
                    <span>MannMitra</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-3">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-smooth ${isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                          }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                  <div className="pt-4 border-t">
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
                    >
                      <BarChart3 className="h-5 w-5" />
                      <span className="font-medium">Admin Dashboard</span>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};