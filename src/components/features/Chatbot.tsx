import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Calendar, Phone } from 'lucide-react';
import { useMood } from '@/contexts/MoodContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
  escalate?: boolean;
}

const localMetaphors = {
  calm: [
    "Like Dal Lake reflects peace, try reflecting calmness within yourself 🌊",
    "Just as the Chinar trees stand strong through seasons, you too can weather this storm 🍂",
    "The mountains of Kashmir have stood for centuries - your strength is just as enduring 🏔️"
  ],
  anxious: [
    "Even the mighty Jhelum river flows gently around obstacles - let your worries flow past you 🌊",
    "In the valleys of Kashmir, morning mist clears to reveal beautiful landscapes - your anxiety will clear too 🌤️"
  ],
  stressed: [
    "Take deep breaths like the fresh mountain air of Gulmarg ❄️",
    "Remember, saffron flowers bloom in harsh conditions - you too will bloom through challenges 🌸"
  ],
  sad: [
    "Like the sun rises over the Himalayas each day, there's always hope for a new beginning 🌅",
    "Even in the coldest winters, spring returns to the valley - your joy will return too 🌸"
  ]
};

const initialBotMessage: Message = {
  id: '1',
  text: "Assalam-o-Alaikum! I'm your MannMitra companion. I'm here to listen and support you. How are you feeling today?",
  sender: 'bot',
  timestamp: new Date(),
  suggestions: [
    "I'm feeling stressed about exams",
    "I'm worried about my future",
    "I need someone to talk to",
    "I want relaxation techniques"
  ]
};

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { currentMood } = useMood();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): Message => {
    const lowercaseMessage = userMessage.toLowerCase();
    let response = "";
    let suggestions: string[] = [];
    let escalate = false;

    // Crisis detection
    if (lowercaseMessage.includes('suicide') || lowercaseMessage.includes('harm myself') || 
        lowercaseMessage.includes('end it all') || lowercaseMessage.includes('kill myself')) {
      response = "I'm really concerned about you. Please know that you're not alone, and your life has value. Let me connect you with professional help immediately.";
      escalate = true;
      suggestions = ["Book urgent counseling", "Call helpline now", "Chat with counselor"];
    }
    // Exam stress
    else if (lowercaseMessage.includes('exam') || lowercaseMessage.includes('test') || lowercaseMessage.includes('study')) {
      response = "Exam stress is very common among students in J&K. " + 
        (localMetaphors.stressed[Math.floor(Math.random() * localMetaphors.stressed.length)] || "") +
        " Let me share some techniques that work well for students here. 📚";
      suggestions = ["Breathing exercises", "Study schedule help", "Exam day tips", "Talk to counselor"];
    }
    // Anxiety
    else if (lowercaseMessage.includes('anxious') || lowercaseMessage.includes('worry') || lowercaseMessage.includes('nervous')) {
      response = "I understand you're feeling anxious. " + 
        (localMetaphors.anxious[Math.floor(Math.random() * localMetaphors.anxious.length)] || "") +
        " Would you like to try some grounding techniques? 🌿";
      suggestions = ["5-4-3-2-1 technique", "Breathing exercise", "Guided meditation", "Book counseling"];
    }
    // Stress
    else if (lowercaseMessage.includes('stress') || lowercaseMessage.includes('overwhelmed') || lowercaseMessage.includes('pressure')) {
      response = "Stress can feel overwhelming, especially with academic pressure. " + 
        (localMetaphors.stressed[Math.floor(Math.random() * localMetaphors.stressed.length)] || "") +
        " Let's work together to manage this. 💪";
      suggestions = ["Stress relief techniques", "Time management", "Relaxation audio", "Peer support"];
    }
    // Sadness
    else if (lowercaseMessage.includes('sad') || lowercaseMessage.includes('depressed') || lowercaseMessage.includes('down')) {
      response = "I hear that you're going through a difficult time. " +
        (localMetaphors.sad[Math.floor(Math.random() * localMetaphors.sad.length)] || "") +
        " Your feelings are valid.";
      suggestions = ["Mood boosting activities", "Connect with friends", "Relaxing music", "Professional support"];
    }
    // Sleep issues
    else if (lowercaseMessage.includes('sleep') || lowercaseMessage.includes('insomnia') || lowercaseMessage.includes('tired')) {
      response = "Sleep is crucial for mental health. Like the peaceful nights in the Kashmir valley, your mind needs rest too. Let me help you with better sleep habits. 🌙";
      suggestions = ["Sleep hygiene tips", "Relaxation techniques", "Night routine", "Herbal remedies"];
    }
    // Career concerns
    else if (lowercaseMessage.includes('career') || lowercaseMessage.includes('job') || lowercaseMessage.includes('future')) {
      response = "Career concerns are normal for students. Just like the diverse opportunities in J&K's growing sectors, there are many paths for you. Let's explore your options. 🎯";
      suggestions = ["Career guidance", "Skill development", "Government schemes", "Counselor advice"];
    }
    // General positive
    else if (lowercaseMessage.includes('good') || lowercaseMessage.includes('happy') || lowercaseMessage.includes('great')) {
      response = "That's wonderful to hear! " + 
        (localMetaphors.calm[Math.floor(Math.random() * localMetaphors.calm.length)] || "") +
        " Keep nurturing this positive energy! ✨";
      suggestions = ["Wellness activities", "Share with community", "Gratitude practice", "Help others"];
    }
    // Default response
    else {
      response = "Thank you for sharing with me. I'm here to listen and support you. " +
        (currentMood !== 'neutral' && localMetaphors[currentMood as keyof typeof localMetaphors] ?
          localMetaphors[currentMood as keyof typeof localMetaphors][0] :
          "You're not alone in this journey.");
      suggestions = ["Tell me more", "Breathing exercise", "Resources library", "Talk to counselor"];
    }

    return {
      id: Date.now().toString(),
      text: response,
      sender: 'bot',
      timestamp: new Date(),
      suggestions,
      escalate
    };
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="flex flex-col h-[600px] wellness-card">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">MannMitra Companion</h3>
            <p className="text-sm text-muted-foreground">Your supportive mental wellness guide</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="space-y-3">
              <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`p-2 rounded-full ${
                    message.sender === 'user' ? 'bg-primary/10' : 'bg-accent'
                  }`}>
                    {message.sender === 'user' ? 
                      <User className="h-4 w-4 text-primary" /> : 
                      <Bot className="h-4 w-4 text-foreground" />
                    }
                  </div>
                  <div className={`p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-accent'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>

              {message.suggestions && (
                <div className="flex flex-wrap gap-2 ml-12">
                  {message.suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs transition-bounce hover:scale-105"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}

              {message.escalate && (
                <div className="ml-12 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone className="h-4 w-4 text-destructive" />
                    <span className="font-semibold text-destructive">Urgent Support Available</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>24/7 Helplines:</p>
                    <p>• National Suicide Prevention: <strong>022-2754 6669</strong></p>
                    <p>• J&K Crisis Helpline: <strong>0194-2440499</strong></p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="destructive">
                        <Calendar className="h-3 w-3 mr-1" />
                        Book Urgent Session
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-3 w-3 mr-1" />
                        Call Now
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-[80%]">
                <div className="p-2 rounded-full bg-accent">
                  <Bot className="h-4 w-4 text-foreground" />
                </div>
                <div className="p-3 rounded-lg bg-accent">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-gentle"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-gentle" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-gentle" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border/50">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message... (Urdu/Hindi/English supported)"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            className="flex-1"
          />
          <Button 
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className="transition-bounce hover:scale-105"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Available in Urdu, Kashmiri, Dogri, Hindi & English • Confidential & Safe
        </p>
      </div>
    </div>
  );
};