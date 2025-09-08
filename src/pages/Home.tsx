import React from 'react';
import { Button } from '@/components/ui/button';
import { MoodSelector } from '@/components/ui/mood-selector';
import { Chatbot } from '@/components/features/Chatbot';
import { Brain, Heart, Shield, Users, Award, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Brain,
    title: "AI-Guided Support",
    description: "24/7 chatbot with local cultural understanding and multilingual support",
    gradient: "wellness-gradient"
  },
  {
    icon: Heart,
    title: "Confidential Counseling",
    description: "Book anonymous sessions with certified counselors across J&K",
    gradient: "mountain-gradient"
  },
  {
    icon: Shield,
    title: "Safe Community",
    description: "Connect with peers in moderated Kashmir & Jammu circles",
    gradient: "saffron-gradient"
  },
  {
    icon: Users,
    title: "Peer Support",
    description: "Anonymous forums with volunteer mentors from local universities",
    gradient: "chinar-gradient"
  }
];

const stats = [
  { number: "5000+", label: "Students Helped", icon: Users },
  { number: "24/7", label: "Support Available", icon: Heart },
  { number: "95%", label: "Satisfaction Rate", icon: Award },
  { number: "100%", label: "Confidential", icon: Shield }
];

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 wellness-gradient opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-primary">MannMitra</span>
                <br />
                <span className="text-muted-foreground text-2xl md:text-3xl">
                  Digital Psychological Support for J&K Students
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Your compassionate companion for mental wellness, designed with understanding 
                of Kashmiri culture and values. Get support in your native language.
              </p>
            </div>

            <div className="animate-slide-up">
              <MoodSelector />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <Button size="lg" className="transition-bounce hover:scale-105" asChild>
                <Link to="/wellness">Start Wellness Journey</Link>
              </Button>
              <Button size="lg" variant="outline" className="transition-bounce hover:scale-105" asChild>
                <Link to="/booking">Book Counseling</Link>
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>Culturally Sensitive</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mental Wellness Support Designed for You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Culturally sensitive mental health resources that understand the unique challenges 
              faced by students in Jammu & Kashmir
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="wellness-card p-6 text-center group cursor-pointer transition-bounce hover:scale-105 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 rounded-full ${feature.gradient} flex items-center justify-center mx-auto mb-4 group-hover:animate-float`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chatbot Section */}
      <section className="py-20 px-4 bg-accent/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Talking to Your AI Companion
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get immediate support with our AI chatbot trained in local cultural context. 
              Available in multiple languages spoken in J&K.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Chatbot />
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Need human support? Our counselors are here for you.
            </p>
            <Button variant="outline" size="lg" asChild className="transition-bounce hover:scale-105">
              <Link to="/booking">Book Professional Counseling</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="py-16 px-4 bg-destructive/5 border-t border-destructive/20">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-destructive mb-4">
              In Crisis? Get Immediate Help
            </h3>
            <p className="text-muted-foreground mb-6">
              If you're experiencing thoughts of self-harm, please reach out immediately. 
              Help is available 24/7.
            </p>
            <div className="space-y-2 text-sm mb-6">
              <p><strong>National Suicide Prevention:</strong> 022-2754 6669</p>
              <p><strong>J&K Crisis Helpline:</strong> 0194-2440499</p>
              <p><strong>MANODARPAN (Education Ministry):</strong> 8448440632</p>
            </div>
            <Button variant="destructive" size="lg" className="transition-bounce hover:scale-105">
              <Phone className="h-4 w-4 mr-2" />
              Emergency Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};