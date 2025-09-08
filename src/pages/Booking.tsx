import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, MapPin, Phone, Shield, Star, User } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Counselor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  experience: string;
  location: string;
  languages: string[];
  image: string;
  price: string;
  nextAvailable: string;
}

const counselors: Counselor[] = [
  {
    id: '1',
    name: 'Dr. Saba Rashid',
    specialization: 'Anxiety & Depression',
    rating: 4.9,
    experience: '8 years',
    location: 'Srinagar',
    languages: ['Kashmiri', 'Urdu', 'Hindi', 'English'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    price: '₹500/session',
    nextAvailable: 'Today 2:00 PM'
  },
  {
    id: '2',
    name: 'Dr. Arjun Sharma',
    specialization: 'Academic Stress & Career',
    rating: 4.8,
    experience: '6 years',
    location: 'Jammu',
    languages: ['Hindi', 'Dogri', 'English'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    price: '₹450/session',
    nextAvailable: 'Tomorrow 10:00 AM'
  },
  {
    id: '3',
    name: 'Dr. Fatima Khan',
    specialization: 'Trauma & PTSD',
    rating: 4.9,
    experience: '10 years',
    location: 'Srinagar',
    languages: ['Kashmiri', 'Urdu', 'English'],
    image: 'https://images.unsplash.com/photo-1594824804732-ca0f0f048b9c?w=150&h=150&fit=crop&crop=face',
    price: '₹600/session',
    nextAvailable: 'Today 4:00 PM'
  },
  {
    id: '4',
    name: 'Dr. Rohit Gupta',
    specialization: 'Sleep & Lifestyle',
    rating: 4.7,
    experience: '5 years',
    location: 'Jammu',
    languages: ['Hindi', 'Dogri', 'Punjabi', 'English'],
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
    price: '₹400/session',
    nextAvailable: 'Tomorrow 2:00 PM'
  }
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
];

export const Booking: React.FC = () => {
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    concerns: '',
    preferredLanguage: '',
    sessionType: 'video'
  });

  const handleBooking = () => {
    // In a real app, this would send data to backend
    alert(`Booking confirmed with ${selectedCounselor?.name} on ${selectedDate ? format(selectedDate, 'PPP') : ''} at ${selectedTime}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Book Counseling Session</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with certified mental health professionals who understand J&K culture and speak your language
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Phone className="h-5 w-5 text-destructive" />
            <span className="font-semibold text-destructive">Crisis Support</span>
          </div>
          <p className="text-sm text-muted-foreground">
            For immediate crisis support, call: <strong>0194-2440499</strong> (J&K Helpline) or <strong>022-2754 6669</strong> (National)
          </p>
        </div>

        {/* Anonymous Toggle */}
        <div className="mb-8 wellness-card p-4">
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <h3 className="font-semibold">Anonymous Booking Available</h3>
              <p className="text-sm text-muted-foreground">Book without sharing personal details</p>
            </div>
            <Button 
              variant={isAnonymous ? "default" : "outline"}
              onClick={() => setIsAnonymous(!isAnonymous)}
            >
              {isAnonymous ? 'Anonymous Mode' : 'Use Anonymous'}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Counselors List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Choose Your Counselor</h2>
            <div className="space-y-4">
              {counselors.map((counselor) => (
                <Card 
                  key={counselor.id}
                  className={`cursor-pointer transition-bounce hover:scale-[1.02] ${
                    selectedCounselor?.id === counselor.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedCounselor(counselor)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={counselor.image} 
                        alt={counselor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{counselor.name}</h3>
                          <span className="text-sm text-primary font-medium">{counselor.price}</span>
                        </div>
                        
                        <p className="text-primary font-medium">{counselor.specialization}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{counselor.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{counselor.experience}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{counselor.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {counselor.languages.map((lang) => (
                            <span key={lang} className="px-2 py-1 bg-accent rounded-full text-xs">
                              {lang}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-1 text-sm text-green-600">
                          <Clock className="h-4 w-4" />
                          <span>Next available: {counselor.nextAvailable}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardHeader>
                  <CardTitle>Book Your Session</CardTitle>
                  <CardDescription>
                    {selectedCounselor ? `Booking with ${selectedCounselor.name}` : 'Select a counselor to continue'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedCounselor && (
                    <>
                      {/* Date Selection */}
                      <div className="space-y-2">
                        <Label>Select Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !selectedDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Time Selection */}
                      <div className="space-y-2">
                        <Label>Select Time</Label>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Session Type */}
                      <div className="space-y-2">
                        <Label>Session Type</Label>
                        <Select value={formData.sessionType} onValueChange={(value) => 
                          setFormData(prev => ({ ...prev, sessionType: value }))
                        }>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="video">Video Call</SelectItem>
                            <SelectItem value="audio">Audio Call</SelectItem>
                            <SelectItem value="chat">Text Chat</SelectItem>
                            <SelectItem value="inperson">In-Person (Srinagar/Jammu)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {!isAnonymous && (
                        <>
                          {/* Personal Details */}
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              id="name" 
                              value={formData.name}
                              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="Your full name" 
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="your.email@example.com" 
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input 
                              id="phone" 
                              value={formData.phone}
                              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                              placeholder="+91 XXXXX XXXXX" 
                            />
                          </div>
                        </>
                      )}

                      {/* Preferred Language */}
                      <div className="space-y-2">
                        <Label>Preferred Language</Label>
                        <Select value={formData.preferredLanguage} onValueChange={(value) => 
                          setFormData(prev => ({ ...prev, preferredLanguage: value }))
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose language" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedCounselor.languages.map((lang) => (
                              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Concerns */}
                      <div className="space-y-2">
                        <Label htmlFor="concerns">Brief Description (Optional)</Label>
                        <Textarea 
                          id="concerns"
                          value={formData.concerns}
                          onChange={(e) => setFormData(prev => ({ ...prev, concerns: e.target.value }))}
                          placeholder="What would you like to discuss? (kept confidential)"
                          rows={3}
                        />
                      </div>

                      {/* Book Button */}
                      <Button 
                        className="w-full transition-bounce hover:scale-105" 
                        onClick={handleBooking}
                        disabled={!selectedDate || !selectedTime}
                      >
                        Book Session - {selectedCounselor.price}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        All sessions are confidential and secure. You can cancel up to 2 hours before.
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};