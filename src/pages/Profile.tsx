import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Award, 
  Calendar, 
  TrendingUp, 
  Heart, 
  Target, 
  Star,
  Crown,
  Flame,
  Mountain,
  Leaf
} from 'lucide-react';

const userStats = {
  name: "Anonymous User",
  joinDate: "January 2024",
  totalPoints: 1247,
  currentStreak: 12,
  longestStreak: 23,
  tasksCompleted: 87,
  badgesEarned: 8,
  level: 15,
  nextLevelPoints: 1500,
  wellnessScore: 78
};

const recentActivity = [
  { 
    type: 'task', 
    title: 'Mountain Gaze Meditation', 
    points: 15, 
    date: 'Today', 
    icon: Mountain 
  },
  { 
    type: 'badge', 
    title: 'Earned Kesar Badge', 
    points: 50, 
    date: 'Yesterday', 
    icon: Award 
  },
  { 
    type: 'streak', 
    title: '10-day wellness streak!', 
    points: 25, 
    date: '2 days ago', 
    icon: Flame 
  },
  { 
    type: 'task', 
    title: 'Saffron Breathing Exercise', 
    points: 15, 
    date: '3 days ago', 
    icon: Leaf 
  }
];

const achievements = [
  {
    id: 1,
    name: "Kesar Badge",
    description: "Completed 7 mindfulness tasks",
    icon: "🌸",
    level: "Bronze",
    unlocked: true,
    unlockedDate: "Jan 15, 2024"
  },
  {
    id: 2,
    name: "Early Bird",
    description: "Completed morning wellness for 5 days",
    icon: "🌅",
    level: "Bronze",
    unlocked: true,
    unlockedDate: "Jan 20, 2024"
  },
  {
    id: 3,
    name: "Chinar Badge",
    description: "Maintained 14-day wellness streak",
    icon: "🍂",
    level: "Silver",
    unlocked: false,
    progress: 12,
    maxProgress: 14
  },
  {
    id: 4,
    name: "Community Helper",
    description: "Helped 10 peers in community",
    icon: "🤝",
    level: "Silver",
    unlocked: false,
    progress: 6,
    maxProgress: 10
  },
  {
    id: 5,
    name: "Wular Lake Badge",
    description: "Completed 30 wellness activities",
    icon: "🌊",
    level: "Gold",
    unlocked: false,
    progress: 23,
    maxProgress: 30
  },
  {
    id: 6,
    name: "Himalayan Badge",
    description: "Achieved wellness master status",
    icon: "🏔️",
    level: "Platinum",
    unlocked: false,
    progress: 1,
    maxProgress: 100
  }
];

const moodData = [
  { mood: "Happy", count: 12, percentage: 35 },
  { mood: "Calm", count: 10, percentage: 29 },
  { mood: "Neutral", count: 8, percentage: 24 },
  { mood: "Stressed", count: 3, percentage: 9 },
  { mood: "Anxious", count: 1, percentage: 3 }
];

export const Profile: React.FC = () => {
  const progressToNextLevel = ((userStats.totalPoints % 100) / 100) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Your Wellness Profile</h1>
          <p className="text-lg text-muted-foreground">
            Track your mental wellness journey and celebrate your achievements
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="wellness-card">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl">
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{userStats.name}</CardTitle>
                <CardDescription>
                  Member since {userStats.joinDate}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Level Progress */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    <span className="text-lg font-semibold">Level {userStats.level}</span>
                  </div>
                  <Progress value={progressToNextLevel} className="mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {userStats.nextLevelPoints - userStats.totalPoints} points to next level
                  </p>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-primary/5">
                    <div className="text-2xl font-bold text-primary">{userStats.totalPoints}</div>
                    <div className="text-xs text-muted-foreground">Total Points</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-orange-500/10">
                    <div className="text-2xl font-bold text-orange-600">{userStats.currentStreak}</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-green-500/10">
                    <div className="text-2xl font-bold text-green-600">{userStats.tasksCompleted}</div>
                    <div className="text-xs text-muted-foreground">Tasks Done</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-purple-500/10">
                    <div className="text-2xl font-bold text-purple-600">{userStats.badgesEarned}</div>
                    <div className="text-xs text-muted-foreground">Badges</div>
                  </div>
                </div>

                {/* Wellness Score */}
                <div className="text-center p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
                  <h3 className="font-semibold mb-2">Wellness Score</h3>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {userStats.wellnessScore}%
                  </div>
                  <Progress value={userStats.wellnessScore} className="mb-2" />
                  <p className="text-xs text-muted-foreground">
                    Based on consistency and engagement
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="achievements">Badges</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Current Streaks */}
                <Card className="wellness-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Flame className="h-5 w-5 text-orange-500" />
                      <span>Active Streaks</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-lg bg-orange-50 border border-orange-200">
                        <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                        <div className="text-xl font-bold text-orange-600">{userStats.currentStreak}</div>
                        <div className="text-sm text-muted-foreground">Current Streak</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <div className="text-xl font-bold text-blue-600">{userStats.longestStreak}</div>
                        <div className="text-sm text-muted-foreground">Longest Streak</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
                        <Calendar className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <div className="text-xl font-bold text-green-600">23</div>
                        <div className="text-sm text-muted-foreground">Days Active</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="wellness-card">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest wellness actions and achievements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                          <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-accent/50">
                            <div className="p-2 rounded-full bg-primary/10">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{activity.title}</h4>
                              <p className="text-xs text-muted-foreground">{activity.date}</p>
                            </div>
                            <div className="text-primary font-semibold text-sm">
                              +{activity.points} pts
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements" className="space-y-6">
                <Card className="wellness-card">
                  <CardHeader>
                    <CardTitle>Achievement Badges</CardTitle>
                    <CardDescription>
                      Collect badges inspired by Kashmir's natural beauty
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {achievements.map((achievement) => (
                        <div 
                          key={achievement.id}
                          className={`p-4 rounded-lg border transition-bounce hover:scale-[1.02] ${
                            achievement.unlocked 
                              ? 'bg-yellow-50 border-yellow-200 ring-2 ring-yellow-300' 
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`text-3xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                              {achievement.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold">{achievement.name}</h3>
                                <Badge 
                                  variant={achievement.unlocked ? "default" : "secondary"}
                                  className={`text-xs ${
                                    achievement.level === 'Bronze' ? 'bg-amber-100 text-amber-800' :
                                    achievement.level === 'Silver' ? 'bg-gray-100 text-gray-800' :
                                    achievement.level === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-purple-100 text-purple-800'
                                  }`}
                                >
                                  {achievement.level}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {achievement.description}
                              </p>
                              
                              {achievement.unlocked ? (
                                <p className="text-xs text-green-600 font-medium">
                                  Unlocked on {achievement.unlockedDate}
                                </p>
                              ) : (
                                <div className="space-y-2">
                                  <Progress 
                                    value={(achievement.progress! / achievement.maxProgress!) * 100} 
                                    className="h-2" 
                                  />
                                  <p className="text-xs text-muted-foreground">
                                    {achievement.progress}/{achievement.maxProgress}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                <Card className="wellness-card">
                  <CardHeader>
                    <CardTitle>Activity Timeline</CardTitle>
                    <CardDescription>Your wellness activities over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.concat(recentActivity).map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                          <div key={index} className="flex items-start space-x-4 pb-4 border-b border-border/50 last:border-0">
                            <div className="p-2 rounded-full bg-primary/10 mt-1">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{activity.title}</h4>
                              <p className="text-sm text-muted-foreground mb-1">
                                Completed {activity.date}
                              </p>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs">
                                  +{activity.points} points
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {activity.type}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Insights Tab */}
              <TabsContent value="insights" className="space-y-6">
                {/* Mood Insights */}
                <Card className="wellness-card">
                  <CardHeader>
                    <CardTitle>Mood Insights</CardTitle>
                    <CardDescription>Your mood patterns over the last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {moodData.map((mood, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{mood.mood}</span>
                            <span className="text-muted-foreground">{mood.count} days</span>
                          </div>
                          <Progress value={mood.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Wellness Trends */}
                <Card className="wellness-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span>Wellness Trends</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">Most Active Time</h4>
                        <p className="text-sm text-green-700">Morning (8-10 AM)</p>
                        <p className="text-xs text-green-600">You complete 65% of tasks in the morning</p>
                      </div>
                      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">Favorite Activity</h4>
                        <p className="text-sm text-blue-700">Mindfulness Tasks</p>
                        <p className="text-xs text-blue-600">73% of your completed activities</p>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                      <h4 className="font-semibold text-yellow-800 mb-2">Improvement Suggestion</h4>
                      <p className="text-sm text-yellow-700">
                        Try adding more physical activities to balance your wellness routine.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};