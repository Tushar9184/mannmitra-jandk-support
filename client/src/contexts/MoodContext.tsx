import React, { createContext, useContext, useState, useEffect } from 'react';

export type MoodType = 'happy' | 'sad' | 'calm' | 'anxious' | 'stressed' | 'neutral';

interface MoodContextType {
  currentMood: MoodType;
  setMood: (mood: MoodType) => void;
  moodHistory: { mood: MoodType; timestamp: Date }[];
  addMoodEntry: (mood: MoodType) => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};

interface MoodProviderProps {
  children: React.ReactNode;
}

export const MoodProvider: React.FC<MoodProviderProps> = ({ children }) => {
  const [currentMood, setCurrentMood] = useState<MoodType>('neutral');
  const [moodHistory, setMoodHistory] = useState<{ mood: MoodType; timestamp: Date }[]>([]);

  const setMood = (mood: MoodType) => {
    setCurrentMood(mood);
    // Apply mood class to body
    document.body.className = document.body.className.replace(/mood-\w+/g, '');
    if (mood !== 'neutral') {
      document.body.classList.add(`mood-${mood}`);
    }
  };

  const addMoodEntry = (mood: MoodType) => {
    const newEntry = { mood, timestamp: new Date() };
    setMoodHistory(prev => [newEntry, ...prev.slice(0, 29)]); // Keep last 30 entries
    setMood(mood);
  };

  useEffect(() => {
    // Initialize with neutral mood
    setMood('neutral');
  }, []);

  return (
    <MoodContext.Provider value={{
      currentMood,
      setMood,
      moodHistory,
      addMoodEntry
    }}>
      {children}
    </MoodContext.Provider>
  );
};