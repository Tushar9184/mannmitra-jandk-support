import React from 'react';
import { Button } from '@/components/ui/button';
import { useMood, MoodType } from '@/contexts/MoodContext';

interface MoodOption {
  mood: MoodType;
  emoji: string;
  label: string;
  description: string;
  gradient: string;
}

const moodOptions: MoodOption[] = [
  {
    mood: 'happy',
    emoji: '😊',
    label: 'Happy',
    description: 'Feeling joyful and positive',
    gradient: 'bg-gradient-to-r from-yellow-400 to-orange-400'
  },
  {
    mood: 'sad',
    emoji: '😢',
    label: 'Sad',
    description: 'Feeling down or low',
    gradient: 'bg-gradient-to-r from-blue-400 to-purple-400'
  },
  {
    mood: 'calm',
    emoji: '😌',
    label: 'Calm',
    description: 'Feeling peaceful and relaxed',
    gradient: 'bg-gradient-to-r from-green-400 to-teal-400'
  },
  {
    mood: 'anxious',
    emoji: '😰',
    label: 'Anxious',
    description: 'Feeling worried or restless',
    gradient: 'bg-gradient-to-r from-gray-400 to-red-300'
  },
  {
    mood: 'stressed',
    emoji: '😵',
    label: 'Stressed',
    description: 'Feeling overwhelmed',
    gradient: 'bg-gradient-to-r from-red-500 to-red-600'
  }
];

interface MoodSelectorProps {
  compact?: boolean;
  onMoodSelect?: (mood: MoodType) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ 
  compact = false, 
  onMoodSelect 
}) => {
  const { currentMood, addMoodEntry } = useMood();

  const handleMoodSelect = (mood: MoodType) => {
    addMoodEntry(mood);
    onMoodSelect?.(mood);
  };

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        {moodOptions.map((option) => (
          <Button
            key={option.mood}
            variant={currentMood === option.mood ? "default" : "outline"}
            size="sm"
            onClick={() => handleMoodSelect(option.mood)}
            className="transition-bounce hover:scale-105"
          >
            <span className="mr-1">{option.emoji}</span>
            {option.label}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">How are you feeling today?</h3>
        <p className="text-muted-foreground text-sm">
          Select your current mood to personalize your experience
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {moodOptions.map((option) => (
          <button
            key={option.mood}
            onClick={() => handleMoodSelect(option.mood)}
            className={`wellness-card p-4 text-center transition-bounce hover:scale-105 cursor-pointer group ${
              currentMood === option.mood 
                ? 'ring-2 ring-primary ring-offset-2' 
                : 'hover:shadow-lg'
            }`}
          >
            <div className="space-y-2">
              <div className="text-3xl group-hover:animate-bounce-gentle">
                {option.emoji}
              </div>
              <div className="space-y-1">
                <div className="font-medium text-sm">{option.label}</div>
                <div className="text-xs text-muted-foreground">
                  {option.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {currentMood !== 'neutral' && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Experience personalized for your <strong>{currentMood}</strong> mood
          </p>
        </div>
      )}
    </div>
  );
};