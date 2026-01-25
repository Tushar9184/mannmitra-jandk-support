import React, { createContext, useContext, useEffect, useState } from 'react';

// Define types for our data
export interface UserStats {
    name: string;
    joinDate: string;
    totalPoints: number;
    currentStreak: number;
    longestStreak: number;
    tasksCompleted: number;
    badgesEarned: number;
    level: number;
    nextLevelPoints: number;
    wellnessScore: number;
}

export interface Activity {
    type: 'task' | 'badge' | 'streak';
    title: string;
    points: number;
    date: string;
    iconName: 'Mountain' | 'Award' | 'Flame' | 'Leaf' | 'Target';
}

interface DataContextType {
    userStats: UserStats;
    recentActivity: Activity[];
    addPoints: (points: number) => void;
    addActivity: (activity: Activity) => void;
}

const defaultStats: UserStats = {
    name: "Student User",
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

const defaultActivity: Activity[] = [
    {
        type: 'task',
        title: 'Mountain Gaze Meditation',
        points: 15,
        date: 'Today',
        iconName: 'Mountain'
    },
    {
        type: 'badge',
        title: 'Earned Kesar Badge',
        points: 50,
        date: 'Yesterday',
        iconName: 'Award'
    },
    {
        type: 'streak',
        title: '10-day wellness streak!',
        points: 25,
        date: '2 days ago',
        iconName: 'Flame'
    }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userStats, setUserStats] = useState<UserStats>(() => {
        const saved = localStorage.getItem('mannmitra_stats');
        return saved ? JSON.parse(saved) : defaultStats;
    });

    const [recentActivity, setRecentActivity] = useState<Activity[]>(() => {
        const saved = localStorage.getItem('mannmitra_activity');
        return saved ? JSON.parse(saved) : defaultActivity;
    });

    useEffect(() => {
        localStorage.setItem('mannmitra_stats', JSON.stringify(userStats));
    }, [userStats]);

    useEffect(() => {
        localStorage.setItem('mannmitra_activity', JSON.stringify(recentActivity));
    }, [recentActivity]);

    const addPoints = (points: number) => {
        setUserStats(prev => ({
            ...prev,
            totalPoints: prev.totalPoints + points,
            nextLevelPoints: 100 * (Math.floor((prev.totalPoints + points) / 100) + 1) // Simple level logic
        }));
    };

    const addActivity = (activity: Activity) => {
        setRecentActivity(prev => [activity, ...prev].slice(0, 50)); // Keep last 50
        addPoints(activity.points);
    };

    return (
        <DataContext.Provider value={{ userStats, recentActivity, addPoints, addActivity }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
