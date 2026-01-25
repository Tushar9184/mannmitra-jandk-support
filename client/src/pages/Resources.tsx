import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Download, BookOpen, Search, Filter, Clock, Star, Eye } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'guide' | 'exercise';
  category: string;
  tags: string[];
  duration: string;
  language: string[];
  rating: number;
  views: number;
  thumbnail: string;
  url: string;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Exam Stress Management for J&K Students',
    description: 'Comprehensive guide for managing competitive exam anxiety with local examples and cultural context.',
    type: 'video',
    category: 'Academic Stress',
    tags: ['#examstress', '#anxiety', '#students'],
    duration: '15 min',
    language: ['Hindi', 'English'],
    rating: 4.8,
    views: 2340,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop',
    url: '#'
  },
  {
    id: '2',
    title: 'Sufi Meditation - Peaceful Mind',
    description: 'Traditional Sufi meditation practices combined with modern mindfulness, featuring local Kashmiri Sufi music.',
    type: 'audio',
    category: 'Meditation',
    tags: ['#meditation', '#sufi', '#peace', '#spiritual'],
    duration: '20 min',
    language: ['Kashmiri', 'Urdu'],
    rating: 4.9,
    views: 1890,
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    url: '#'
  },
  {
    id: '3',
    title: 'Career Guidance for Kashmir Youth',
    description: 'Explore career opportunities in J&K and beyond, with insights on government jobs, entrepreneurship, and emerging sectors.',
    type: 'guide',
    category: 'Career',
    tags: ['#career', '#guidance', '#opportunities'],
    duration: '25 min',
    language: ['Hindi', 'English', 'Urdu'],
    rating: 4.7,
    views: 3210,
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
    url: '#'
  },
  {
    id: '4',
    title: 'Dal Lake Breathing Exercise',
    description: 'Guided breathing exercises inspired by the serene waters of Dal Lake. Perfect for anxiety relief.',
    type: 'exercise',
    category: 'Breathing',
    tags: ['#breathing', '#anxiety', '#calm', '#dalLake'],
    duration: '10 min',
    language: ['Kashmiri', 'Hindi', 'English'],
    rating: 4.9,
    views: 1567,
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    url: '#'
  },
  {
    id: '5',
    title: 'Understanding Depression in Youth',
    description: 'Educational video about recognizing depression symptoms and when to seek help, with local counselor insights.',
    type: 'video',
    category: 'Mental Health',
    tags: ['#depression', '#awareness', '#help'],
    duration: '18 min',
    language: ['Hindi', 'English'],
    rating: 4.6,
    views: 2100,
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
    url: '#'
  },
  {
    id: '6',
    title: 'Sleep Better with Chinar Sounds',
    description: 'Relaxing natural sounds from Kashmir forests, perfect for improving sleep quality and reducing insomnia.',
    type: 'audio',
    category: 'Sleep',
    tags: ['#sleep', '#nature', '#relaxation'],
    duration: '60 min',
    language: ['Universal'],
    rating: 4.8,
    views: 4560,
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop',
    url: '#'
  },
  {
    id: '7',
    title: 'Building Resilience: Mountain Metaphors',
    description: 'Learn resilience techniques using the strength and endurance of Himalayan mountains as inspiration.',
    type: 'guide',
    category: 'Resilience',
    tags: ['#resilience', '#strength', '#mountains'],
    duration: '22 min',
    language: ['Hindi', 'English', 'Urdu'],
    rating: 4.7,
    views: 1890,
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    url: '#'
  },
  {
    id: '8',
    title: 'Progressive Muscle Relaxation',
    description: 'Step-by-step muscle relaxation exercise to release physical tension and stress.',
    type: 'exercise',
    category: 'Relaxation',
    tags: ['#relaxation', '#exercise', '#tension'],
    duration: '15 min',
    language: ['Hindi', 'English'],
    rating: 4.5,
    views: 1234,
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    url: '#'
  }
];

const categories = ['All', 'Academic Stress', 'Meditation', 'Career', 'Breathing', 'Mental Health', 'Sleep', 'Resilience', 'Relaxation'];

const typeIcons = {
  video: Play,
  audio: Download,
  guide: BookOpen,
  exercise: Clock
};

export const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'All' || resource.language.includes(selectedLanguage);
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
    const Icon = typeIcons[resource.type];
    
    return (
      <Card className="wellness-card cursor-pointer transition-bounce hover:scale-[1.02] group">
        <div className="relative">
          <img 
            src={resource.thumbnail} 
            alt={resource.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
            <Button size="lg" className="glow-shadow">
              <Icon className="h-5 w-5 mr-2" />
              {resource.type === 'video' ? 'Watch' : resource.type === 'audio' ? 'Listen' : 'Read'}
            </Button>
          </div>
          <Badge className="absolute top-3 left-3 capitalize">{resource.type}</Badge>
          <Badge variant="secondary" className="absolute top-3 right-3">{resource.duration}</Badge>
        </div>
        
        <CardHeader className="pb-3">
          <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
          <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{resource.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{resource.views.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {resource.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-1">
            {resource.language.map((lang) => (
              <span key={lang} className="px-2 py-1 bg-accent rounded-full text-xs">
                {lang}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Wellness Resource Library</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Curated mental health resources in multiple languages, designed specifically for students in Jammu & Kashmir
          </p>
        </div>

        {/* Search and Filters */}
        <div className="wellness-card p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources, tags, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <select 
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select 
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="All">All Languages</option>
                <option value="Kashmiri">Kashmiri</option>
                <option value="Urdu">Urdu</option>
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
                <option value="Dogri">Dogri</option>
              </select>
            </div>
          </div>
        </div>

        {/* Resource Categories */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid grid-cols-5 lg:grid-cols-9 gap-2 h-auto p-2">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="videos" className="text-xs">Videos</TabsTrigger>
            <TabsTrigger value="audios" className="text-xs">Audio</TabsTrigger>
            <TabsTrigger value="guides" className="text-xs">Guides</TabsTrigger>
            <TabsTrigger value="exercises" className="text-xs">Exercises</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredResources.filter(r => r.type === 'video').map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="audios" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredResources.filter(r => r.type === 'audio').map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guides" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredResources.filter(r => r.type === 'guide').map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="exercises" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredResources.filter(r => r.type === 'exercise').map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Access Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="wellness-card cursor-pointer transition-bounce hover:scale-105 mountain-gradient text-white">
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">5-Minute Calm</h3>
                <p className="text-sm opacity-90">Quick stress relief</p>
              </CardContent>
            </Card>
            
            <Card className="wellness-card cursor-pointer transition-bounce hover:scale-105 saffron-gradient text-white">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Exam Toolkit</h3>
                <p className="text-sm opacity-90">Academic stress help</p>
              </CardContent>
            </Card>
            
            <Card className="wellness-card cursor-pointer transition-bounce hover:scale-105 wellness-gradient text-white">
              <CardContent className="p-6 text-center">
                <Download className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Sleep Sounds</h3>
                <p className="text-sm opacity-90">Kashmir nature audio</p>
              </CardContent>
            </Card>
            
            <Card className="wellness-card cursor-pointer transition-bounce hover:scale-105 chinar-gradient text-white">
              <CardContent className="p-6 text-center">
                <Play className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Crisis Support</h3>
                <p className="text-sm opacity-90">Immediate help videos</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Government Resources */}
        <div className="wellness-card p-6">
          <h2 className="text-xl font-bold mb-4">Government & NGO Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">MANODARPAN (Education Ministry)</h3>
              <p className="text-sm text-muted-foreground">Toll-Free: 8448440632</p>
              <p className="text-xs">Mental health support for students</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">J&K Student Helpline</h3>
              <p className="text-sm text-muted-foreground">Call: 0194-2440499</p>
              <p className="text-xs">24/7 crisis intervention</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Career Guidance Cell</h3>
              <p className="text-sm text-muted-foreground">University of Kashmir</p>
              <p className="text-xs">Academic & career counseling</p>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
          </div>
        )}

        {filteredResources.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Showing {filteredResources.length} of {resources.length} resources
            </p>
          </div>
        )}
      </div>
    </div>
  );
};