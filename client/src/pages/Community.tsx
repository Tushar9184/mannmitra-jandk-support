import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Smile, 
  TreePine, 
  MessageCircle, 
  Share2, 
  Shield, 
  Users, 
  MapPin, 
  Clock,
  Plus,
  Search,
  Filter
} from 'lucide-react';

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  tags: string[];
  circle: 'Kashmir' | 'Jammu' | 'General';
  reactions: {
    hug: number;
    strength: number;
    calm: number;
  };
  replies: number;
  isAnonymous: boolean;
}

interface Mentor {
  id: string;
  name: string;
  university: string;
  specialization: string;
  avatar: string;
  isOnline: boolean;
  helpedStudents: number;
}

const samplePosts: Post[] = [
  {
    id: '1',
    author: 'Anonymous Student',
    avatar: '',
    content: "Exam stress is getting overwhelming. Tomorrow is my engineering entrance and I can't sleep. Anyone else feeling this way? 😰",
    timestamp: '2 hours ago',
    tags: ['#examstress', '#engineering', '#sleepissues'],
    circle: 'Kashmir',
    reactions: { hug: 15, strength: 8, calm: 12 },
    replies: 7,
    isAnonymous: true
  },
  {
    id: '2',
    author: 'Hopeful_Dreamer',
    avatar: 'HD',
    content: "Just wanted to share that meditation really helps! Started with 5 minutes daily near Dal Lake, now I feel more centered. The mountains remind me that problems are temporary but strength is permanent. 🏔️✨",
    timestamp: '4 hours ago',
    tags: ['#meditation', '#positivity', '#dalLake', '#mountains'],
    circle: 'Kashmir',
    reactions: { hug: 23, strength: 31, calm: 19 },
    replies: 12,
    isAnonymous: false
  },
  {
    id: '3',
    author: 'Anonymous',
    avatar: '',
    content: "Career confusion is real. Everyone expects me to become a doctor but I want to pursue arts. Parents don't understand. How do I convince them? 💔",
    timestamp: '6 hours ago',
    tags: ['#career', '#family', '#arts', '#pressure'],
    circle: 'Jammu',
    reactions: { hug: 18, strength: 9, calm: 6 },
    replies: 15,
    isAnonymous: true
  },
  {
    id: '4',
    author: 'Valley_Peace',
    avatar: 'VP',
    content: "To everyone struggling: You're not alone. Just like the Chinar trees survive harsh winters and bloom again, we too will overcome our challenges. Sending virtual hugs to all! 🤗🍂",
    timestamp: '1 day ago',
    tags: ['#support', '#chinar', '#motivation', '#virtual_hugs'],
    circle: 'General',
    reactions: { hug: 47, strength: 28, calm: 35 },
    replies: 23,
    isAnonymous: false
  }
];

const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Arjun Sharma',
    university: 'NIT Srinagar',
    specialization: 'Engineering & Tech Careers',
    avatar: 'AS',
    isOnline: true,
    helpedStudents: 156
  },
  {
    id: '2',
    name: 'Priya Devi',
    university: 'University of Kashmir',
    specialization: 'Psychology & Counseling',
    avatar: 'PD',
    isOnline: true,
    helpedStudents: 203
  },
  {
    id: '3',
    name: 'Rohit Koul',
    university: 'University of Jammu',
    specialization: 'Career Guidance',
    avatar: 'RK',
    isOnline: false,
    helpedStudents: 98
  },
  {
    id: '4',
    name: 'Sana Ahmed',
    university: 'SKUAST Kashmir',
    specialization: 'Academic Stress',
    avatar: 'SA',
    isOnline: true,
    helpedStudents: 134
  }
];

const reactionEmojis = {
  hug: '🤗',
  strength: '💪',
  calm: '🌿'
};

export const Community: React.FC = () => {
  const [selectedCircle, setSelectedCircle] = useState<string>('All');
  const [newPost, setNewPost] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const availableTags = ['#anxiety', '#depression', '#examstress', '#career', '#family', '#sleep', '#motivation', '#support'];

  const filteredPosts = samplePosts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCircle = selectedCircle === 'All' || post.circle === selectedCircle;
    return matchesSearch && matchesCircle;
  });

  const PostCard: React.FC<{ post: Post }> = ({ post }) => (
    <Card className="wellness-card transition-bounce hover:scale-[1.01]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.avatar} />
              <AvatarFallback className="text-xs">
                {post.isAnonymous ? '👤' : post.author.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{post.author}</p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{post.circle} Circle</span>
                <Clock className="h-3 w-3" />
                <span>{post.timestamp}</span>
              </div>
            </div>
          </div>
          {post.isAnonymous && (
            <Badge variant="secondary" className="text-xs">
              <Shield className="h-3 w-3 mr-1" />
              Anonymous
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm mb-4 leading-relaxed">{post.content}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {Object.entries(post.reactions).map(([type, count]) => (
              <Button
                key={type}
                variant="ghost"
                size="sm"
                className="p-1 h-auto transition-bounce hover:scale-110"
              >
                <span className="mr-1">{reactionEmojis[type as keyof typeof reactionEmojis]}</span>
                <span className="text-xs">{count}</span>
              </Button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-xs">
              <MessageCircle className="h-3 w-3 mr-1" />
              {post.replies}
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <Share2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const MentorCard: React.FC<{ mentor: Mentor }> = ({ mentor }) => (
    <Card className="wellness-card">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${mentor.name}&background=random`} />
              <AvatarFallback>{mentor.avatar}</AvatarFallback>
            </Avatar>
            {mentor.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{mentor.name}</h3>
            <p className="text-xs text-muted-foreground">{mentor.university}</p>
            <p className="text-xs text-primary">{mentor.specialization}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>Helped {mentor.helpedStudents} students</span>
          <span className={mentor.isOnline ? 'text-green-600' : 'text-gray-500'}>
            {mentor.isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
        
        <Button size="sm" className="w-full" disabled={!mentor.isOnline}>
          <MessageCircle className="h-3 w-3 mr-1" />
          Chat with Mentor
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Peer Support Community</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A safe, anonymous space to connect with fellow students from Kashmir and Jammu circles
          </p>
        </div>

        {/* Safety Banner */}
        <div className="wellness-card p-4 mb-6 bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-800">Safe Space Guidelines</span>
          </div>
          <p className="text-sm text-blue-700">
            This is a moderated, supportive community. Be kind, respectful, and supportive. Report any inappropriate content.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-6">
            {/* Create Post */}
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="text-lg">Share with Community</CardTitle>
                <CardDescription>Your post will be shared anonymously by default</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What's on your mind? Share your thoughts, experiences, or ask for support..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
                
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer transition-bounce hover:scale-105"
                      onClick={() => {
                        setSelectedTags(prev => 
                          prev.includes(tag) 
                            ? prev.filter(t => t !== tag)
                            : [...prev, tag]
                        );
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Post anonymously</span>
                    </label>
                  </div>
                  
                  <Button className="transition-bounce hover:scale-105">
                    <Plus className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <div className="wellness-card p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant={selectedCircle === 'All' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCircle('All')}
                  >
                    All
                  </Button>
                  <Button
                    variant={selectedCircle === 'Kashmir' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCircle('Kashmir')}
                  >
                    Kashmir Circle
                  </Button>
                  <Button
                    variant={selectedCircle === 'Jammu' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCircle('Jammu')}
                  >
                    Jammu Circle
                  </Button>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12 wellness-card">
                <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                <p className="text-muted-foreground">Try adjusting your search or be the first to post!</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Community Stats */}
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="text-lg">Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Students</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Posts Today</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Support Given</span>
                  <span className="font-semibold">🤗 3,456</span>
                </div>
              </CardContent>
            </Card>

            {/* Online Mentors */}
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="text-lg">Volunteer Mentors</CardTitle>
                <CardDescription>Students from local universities ready to help</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mentors.map((mentor) => (
                  <MentorCard key={mentor.id} mentor={mentor} />
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Crisis Support
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Find Study Buddy
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Join Group Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};