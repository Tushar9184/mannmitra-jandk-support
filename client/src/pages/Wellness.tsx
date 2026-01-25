import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { MoodSelector } from '@/components/ui/mood-selector';
import { 
  Mountain, 
  Leaf, 
  Coffee, 
  Heart, 
  Award, 
  Calendar as CalendarIcon,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  TreePine,
  Sun,
  Moon
} from 'lucide-react';

interface WellnessTask {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: React.ElementType;
  category: 'mindfulness' | 'physical' | 'social' | 'academic';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  culturalFlavor: string;
  completed: boolean;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

const wellnessTasks: WellnessTask[] = [
  {
    id: '1',
    title: 'Noon Chai Mindfulness',
    description: 'Drink your traditional noon chai mindfully, without phone or distractions',
    points: 10,
    icon: Coffee,
    category: 'mindfulness',
    difficulty: 'easy',
    estimatedTime: '10 min',
    culturalFlavor: 'Traditional Kashmiri practice',
    completed: false
  },
  {
    id: '2',
    title: 'Mountain Gaze Meditation',
    description: 'Take 5 minutes to observe the mountains and practice gratitude',
    points: 15,
    icon: Mountain,
    category: 'mindfulness',
    difficulty: 'easy',
    estimatedTime: '5 min',
    culturalFlavor: 'Inspired by Himalayan views',
    completed: true
  },
  {
    id: '3',
    title: 'Chinar Walk',
    description: 'Take a mindful walk under Chinar trees, notice their strength and resilience',
    points: 20,
    icon: TreePine,
    category: 'physical',
    difficulty: 'medium',
    estimatedTime: '15 min',
    culturalFlavor: 'Kashmir\'s iconic trees as inspiration',
    completed: false
  },
  {
    id: '4',
    title: 'Saffron Breathing',
    description: 'Practice 4-7-8 breathing while visualizing saffron fields',
    points: 15,
    icon: Leaf,
    category: 'mindfulness',
    difficulty: 'medium',
    estimatedTime: '8 min',
    culturalFlavor: 'Golden saffron symbolism',
    completed: false
  },
  {
    id: '5',
    title: 'Gratitude Journal',
    description: 'Write three things you\'re grateful for, inspired by Kashmir\'s beauty',
    points: 12,
    icon: Heart,
    category: 'mindfulness',
    difficulty: 'easy',
    estimatedTime: '10 min',
    culturalFlavor: 'Reflect on local blessings',
    completed: false
  }
];

const badges: Badge[] = [
  {
    id: '1',
    name: 'Kesar Badge',
    description: 'Complete 7 mindfulness tasks',
    icon: '🌸',
    level: 'Bronze',
    unlocked: false,
    progress: 3,
    maxProgress: 7
  },
  {
    id: '2',
    name: 'Chinar Badge',
    description: 'Maintain 14-day wellness streak',
    icon: '🍂',
    level: 'Silver',
    unlocked: false,
    progress: 5,
    maxProgress: 14
  },
  {
    id: '3',
    name: 'Wular Lake Badge',
    description: 'Complete 30 wellness activities',
    icon: '🌊',
    level: 'Gold',
    unlocked: false,
    progress: 12,
    maxProgress: 30
  },
  {
    id: '4',
    name: 'Himalayan Badge',
    description: 'Achieve wellness master status',
    icon: '🏔️',
    level: 'Platinum',
    unlocked: false,
    progress: 0,
    maxProgress: 100
  }
];

const breathingExercise = {
  inhale: 4,
  hold: 7,
  exhale: 8
};

export const Wellness: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentStreak, setCurrentStreak] = useState(5);
  const [totalPoints, setTotalPoints] = useState(247);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingCount, setBreathingCount] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<string[]>(['2']);

  const handleTaskComplete = (taskId: string) => {
    if (completedTasks.includes(taskId)) return;
    
    const task = wellnessTasks.find(t => t.id === taskId);
    if (task) {
      setCompletedTasks(prev => [...prev, taskId]);
      setTotalPoints(prev => prev + task.points);
      // In real app, this would also update streaks and badge progress
    }
  };

  const TaskCard: React.FC<{ task: WellnessTask }> = ({ task }) => {
    const Icon = task.icon;
    const isCompleted = completedTasks.includes(task.id);
    
    return (
      <Card className={`wellness-card cursor-pointer transition-bounce hover:scale-[1.02] ${
        isCompleted ? 'ring-2 ring-green-500 bg-green-50' : ''
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                isCompleted ? 'bg-green-500 text-white' : 'bg-primary/10 text-primary'
              }`}>
                {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </div>
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-xs text-muted-foreground">{task.culturalFlavor}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-primary">+{task.points} pts</div>
              <div className="text-xs text-muted-foreground">{task.estimatedTime}</div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-sm mb-4">{task.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs ${
                task.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                task.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {task.difficulty}
              </span>
              <span className="px-2 py-1 bg-accent rounded-full text-xs capitalize">
                {task.category}
              </span>
            </div>
            
            <Button
              size="sm"
              disabled={isCompleted}
              onClick={() => handleTaskComplete(task.id)}
              className="transition-bounce hover:scale-105"
            >
              {isCompleted ? 'Completed' : 'Start'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const BadgeCard: React.FC<{ badge: Badge }> = ({ badge }) => (
    <Card className={`wellness-card ${badge.unlocked ? 'ring-2 ring-yellow-500' : ''}`}>
      <CardContent className="p-4 text-center">
        <div className="text-4xl mb-2 grayscale-0">{badge.icon}</div>
        <h3 className="font-semibold text-sm mb-1">{badge.name}</h3>
        <p className="text-xs text-muted-foreground mb-3">{badge.description}</p>
        
        <div className="space-y-2">
          <Progress value={(badge.progress / badge.maxProgress) * 100} className="h-2" />
          <div className="text-xs text-muted-foreground">
            {badge.progress}/{badge.maxProgress}
          </div>
        </div>
        
        <div className={`mt-2 px-2 py-1 rounded-full text-xs ${
          badge.level === 'Bronze' ? 'bg-amber-100 text-amber-800' :
          badge.level === 'Silver' ? 'bg-gray-100 text-gray-800' :
          badge.level === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {badge.level}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Wellness Journey</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Build healthy habits with activities inspired by Kashmir's natural beauty and cultural wisdom
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Daily Mood Check */}
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle>Today's Mood Check</CardTitle>
                <CardDescription>How are you feeling today? This helps personalize your experience.</CardDescription>
              </CardHeader>
              <CardContent>
                <MoodSelector compact onMoodSelect={(mood) => console.log('Mood selected:', mood)} />
              </CardContent>
            </Card>

            {/* Breathing Exercise */}
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle>Saffron Field Breathing</CardTitle>
                <CardDescription>Practice 4-7-8 breathing while visualizing golden saffron fields</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 mx-auto rounded-full border-4 border-primary/20 flex items-center justify-center relative overflow-hidden">
                    <div className="saffron-gradient absolute inset-0 opacity-20"></div>
                    <div className="text-2xl font-bold z-10">{breathingCount}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Current phase: <span className="capitalize font-medium">{breathingPhase}</span>
                    </p>
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant={isBreathingActive ? "destructive" : "default"}
                        onClick={() => setIsBreathingActive(!isBreathingActive)}
                        className="transition-bounce hover:scale-105"
                      >
                        {isBreathingActive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                        {isBreathingActive ? 'Pause' : 'Start'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setBreathingCount(0);
                          setBreathingPhase('inhale');
                          setIsBreathingActive(false);
                        }}
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Tasks */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Today's Wellness Tasks</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {wellnessTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>

            {/* Achievement Badges */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Achievement Badges</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Summary */}
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{totalPoints}</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500 mb-1">{currentStreak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Daily Goal</span>
                    <span>3/5 tasks</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Mood Calendar */}
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="text-lg">Mood Calendar</CardTitle>
                <CardDescription>Track your daily mood patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-0 p-0 pointer-events-auto"
                />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Wellness</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Mountain className="h-4 w-4 mr-2" />
                  2-min Mountain Meditation
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Gratitude Practice
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Coffee className="h-4 w-4 mr-2" />
                  Mindful Tea Break
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <TreePine className="h-4 w-4 mr-2" />
                  Nature Sounds
                </Button>
              </CardContent>
            </Card>

            {/* Today's Reflection */}
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="text-lg">Daily Reflection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  "What is one thing you noticed in nature today that brought you peace?"
                </p>
                <Button size="sm" className="w-full">Write Reflection</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};